import { NextResponse } from "next/server";

import { isRateLimited, labelFor, validateLead, type LeadKind } from "@/lib/lead";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  kind?: LeadKind;
  values?: Record<string, string>;
  honeypot?: string;
  page?: string;
};

function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function summarise(kind: LeadKind, values: Record<string, string>): string {
  return Object.entries(values)
    .map(([key, value]) => `${labelFor(kind, key)}: ${value}`)
    .join("\n");
}

export async function POST(req: Request) {
  let body: Body;

  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not read that submission." },
      { status: 400 },
    );
  }

  // Bots fill every input they find. Humans never see this one.
  if (body.honeypot && body.honeypot.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const kind: LeadKind = body.kind === "membership" ? "membership" : "free_session";

  if (isRateLimited(clientIp(req))) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "That is a few too many submissions. Please call Sam on 925-200-0979 instead.",
      },
      { status: 429 },
    );
  }

  const result = validateLead({
    kind,
    values: body.values ?? {},
    honeypot: body.honeypot,
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, errors: result.errors },
      { status: 422 },
    );
  }

  const payload = {
    kind,
    submittedAt: new Date().toISOString(),
    page: body.page ?? null,
    referrer: req.headers.get("referer") ?? null,
    userAgent: req.headers.get("user-agent") ?? null,
    ...result.values,
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const delivered: string[] = [];

  /* --- 1. Webhook (Zapier / Make / n8n / Slack / Formspree) ---------------- */
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(process.env.LEAD_SHARED_SECRET
            ? { "x-lead-token": process.env.LEAD_SHARED_SECRET }
            : {}),
        },
        body: JSON.stringify({
          subject:
            kind === "membership"
              ? `New gym membership application: ${result.values.name}`
              : `New free session request: ${result.values.name}`,
          text: summarise(kind, result.values),
          ...payload,
        }),
      });

      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      delivered.push("webhook");
    } catch (error) {
      console.error("[lead] webhook failed", error);
    }
  }

  /* --- 2. Email via Resend ------------------------------------------------- */
  if (resendKey && process.env.LEAD_EMAIL_TO && process.env.LEAD_EMAIL_FROM) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          authorization: `Bearer ${resendKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.LEAD_EMAIL_FROM,
          to: [process.env.LEAD_EMAIL_TO],
          reply_to: result.values.email,
          subject:
            kind === "membership"
              ? `New gym membership application: ${result.values.name}`
              : `New free session request: ${result.values.name}`,
          text: `${summarise(kind, result.values)}\n\nSubmitted: ${payload.submittedAt}\nPage: ${payload.page ?? "-"}`,
        }),
      });

      if (!res.ok) throw new Error(`Resend responded ${res.status}`);
      delivered.push("email");
    } catch (error) {
      console.error("[lead] email failed", error);
    }
  }

  /* --- 3. Nothing configured: keep the lead in the logs ------------------- */
  if (delivered.length === 0) {
    console.warn(
      "[lead] No LEAD_WEBHOOK_URL or Resend credentials set. Lead was not forwarded:\n" +
        JSON.stringify(payload, null, 2),
    );
  }

  return NextResponse.json({ ok: true, delivered });
}
