/* ===========================================================================
   LEAD FORM DEFINITIONS + VALIDATION
   Shared by the client form and the API route so the rules can never drift.
   No validation library: the rules here are small and explicit.
   =========================================================================== */

export type LeadKind = "membership" | "free_session";

export type FieldKind = "text" | "email" | "tel" | "textarea" | "select" | "consent";

export type Field = {
  name: string;
  label: string;
  kind: FieldKind;
  required?: boolean;
  placeholder?: string;
  helper?: string;
  options?: readonly string[];
  autoComplete?: string;
  /** Renders side by side with the previous half field on >= sm. */
  half?: boolean;
  rows?: number;
};

export const FIELDS: Record<LeadKind, readonly Field[]> = {
  membership: [
    {
      name: "name",
      label: "Your name",
      kind: "text",
      required: true,
      autoComplete: "name",
      placeholder: "First and last",
      half: true,
    },
    {
      name: "phone",
      label: "Phone",
      kind: "tel",
      required: true,
      autoComplete: "tel",
      placeholder: "(714) 000-0000",
      half: true,
    },
    {
      name: "email",
      label: "Email",
      kind: "email",
      required: true,
      autoComplete: "email",
      placeholder: "you@example.com",
    },
    {
      name: "experience",
      label: "How long have you been training?",
      kind: "select",
      required: true,
      options: [
        "I am new to this",
        "Under a year",
        "One to three years",
        "Three years or more",
        "Coming back after a break",
      ],
    },
    {
      name: "schedule",
      label: "When would you normally train?",
      kind: "select",
      required: true,
      options: [
        "Early mornings",
        "Mornings",
        "Lunchtime",
        "Afternoons",
        "Evenings",
        "Varies week to week",
      ],
    },
    {
      name: "goals",
      label: "What are you training for?",
      kind: "textarea",
      required: true,
      rows: 4,
      placeholder:
        "A sport, an event, a doctor's advice, or just wanting to feel different. Anything you are working around, old injuries included.",
      helper:
        "Sam reads every application himself. The more specific you are, the more useful his reply.",
    },
    {
      name: "consent",
      label:
        "I agree to be contacted by phone, text or email about my application.",
      kind: "consent",
      required: true,
    },
  ],

  free_session: [
    {
      name: "name",
      label: "Your name",
      kind: "text",
      required: true,
      autoComplete: "name",
      placeholder: "First and last",
      half: true,
    },
    {
      name: "phone",
      label: "Phone",
      kind: "tel",
      required: true,
      autoComplete: "tel",
      placeholder: "(714) 000-0000",
      half: true,
    },
    {
      name: "email",
      label: "Email",
      kind: "email",
      required: true,
      autoComplete: "email",
      placeholder: "you@example.com",
    },
    {
      name: "availability",
      label: "What days usually work for you?",
      kind: "select",
      required: true,
      options: [
        "Weekday mornings",
        "Weekday afternoons",
        "Weekday evenings",
        "Weekends",
        "My schedule moves around",
      ],
    },
    {
      name: "goal",
      label: "What do you want to change?",
      kind: "textarea",
      required: true,
      rows: 4,
      placeholder:
        "Strength, body composition, a specific lift, getting back into it after time off. Anything Sam should know before you train.",
      helper:
        "This is what he will build your free session around, so it is worth two minutes.",
    },
    {
      name: "consent",
      label: "I agree to be contacted by phone, text or email about my session.",
      kind: "consent",
      required: true,
    },
  ],
} as const;

export type LeadInput = {
  kind: LeadKind;
  values: Record<string, string>;
  honeypot?: string;
};

export type ValidationResult =
  | { ok: true; values: Record<string, string> }
  | { ok: false; errors: Record<string, string> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function digits(value: string) {
  return value.replace(/\D/g, "");
}

export function validateLead(input: LeadInput): ValidationResult {
  const errors: Record<string, string> = {};
  const fields = FIELDS[input.kind];

  if (!fields) {
    return { ok: false, errors: { form: "Unknown form." } };
  }

  const clean: Record<string, string> = {};

  for (const field of fields) {
    const raw = (input.values?.[field.name] ?? "").toString().trim();

    if (field.kind === "consent") {
      if (raw !== "yes") {
        errors[field.name] = "Please tick this box so Sam is allowed to reply.";
      } else {
        clean[field.name] = "yes";
      }
      continue;
    }

    if (!raw) {
      if (field.required) errors[field.name] = `${field.label} is required.`;
      continue;
    }

    switch (field.kind) {
      case "email":
        if (!EMAIL_RE.test(raw)) {
          errors[field.name] = "That email address does not look complete.";
        } else if (raw.length > 200) {
          errors[field.name] = "That email address is too long.";
        } else {
          clean[field.name] = raw;
        }
        break;

      case "tel": {
        const d = digits(raw);
        if (d.length < 10 || d.length > 15) {
          errors[field.name] = "Please enter a phone number with area code.";
        } else {
          clean[field.name] = raw;
        }
        break;
      }

      case "select":
        if (field.options && !field.options.includes(raw)) {
          errors[field.name] = "Please choose one of the options.";
        } else {
          clean[field.name] = raw;
        }
        break;

      default:
        if (raw.length > 1500) {
          errors[field.name] = "That is a little too long. Keep it under 1500 characters.";
        } else {
          clean[field.name] = raw;
        }
    }
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, values: clean };
}

/* ---------------------------------------------------------------------------
   Very small in-memory throttle. Good enough to stop naive form spam on a
   single serverless instance. If this site ever gets real bot traffic, move it
   to Upstash Redis or Vercel's own rate limiting.
   --------------------------------------------------------------------------- */
const ATTEMPTS = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 6;

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (ATTEMPTS.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_ATTEMPTS) {
    ATTEMPTS.set(key, recent);
    return true;
  }

  recent.push(now);
  ATTEMPTS.set(key, recent);

  if (ATTEMPTS.size > 500) {
    for (const [k, v] of ATTEMPTS) {
      if (v.every((t) => now - t > WINDOW_MS)) ATTEMPTS.delete(k);
    }
  }

  return false;
}

export function labelFor(kind: LeadKind, name: string): string {
  return FIELDS[kind].find((f) => f.name === name)?.label ?? name;
}
