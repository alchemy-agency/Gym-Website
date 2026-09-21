"use client";

import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import { useId, useRef, useState, type FormEvent } from "react";

import { Button } from "@/components/Button";
import { cn } from "@/lib/cn";
import { FIELDS, validateLead, type Field, type LeadKind } from "@/lib/lead";

const INPUT =
  "w-full border bg-ink-2 px-4 text-[0.9375rem] text-bone transition-colors placeholder:text-bone-3";
const INPUT_OK = "border-bone-3/70 hover:border-bone-3";
const INPUT_BAD = "border-ember";

export function LeadForm({
  kind,
  submitLabel,
  note,
  id,
}: {
  kind: LeadKind;
  submitLabel: string;
  note?: string;
  id?: string;
}) {
  const router = useRouter();
  const baseId = useId();
  const fields = FIELDS[kind];

  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const honeypot = useRef<HTMLInputElement>(null);

  function set(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  function focusFirstError(nextErrors: Record<string, string>) {
    const first = fields.find((f) => nextErrors[f.name]);
    if (!first) return;
    const el = document.getElementById(`${baseId}-${first.name}`);
    if (el instanceof HTMLElement) el.focus();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const result = validateLead({
      kind,
      values,
      honeypot: honeypot.current?.value ?? "",
    });

    if (!result.ok) {
      setErrors(result.errors);
      focusFirstError(result.errors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          kind,
          values: result.values,
          honeypot: honeypot.current?.value ?? "",
          page: typeof window !== "undefined" ? window.location.pathname : null,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        errors?: Record<string, string>;
      };

      if (!res.ok || !data.ok) {
        if (data.errors) {
          setErrors(data.errors);
          focusFirstError(data.errors);
        }
        setFormError(
          data.error ??
            "Something went wrong sending that. Please try again, or call Sam on 925-200-0979.",
        );
        setSubmitting(false);
        return;
      }

      // The /thank-you page owns the conversion event so it fires exactly once.
      router.push(`/thank-you?type=${kind}`);
    } catch {
      setFormError(
        "Could not reach the server. Please try again, or call Sam on 925-200-0979.",
      );
      setSubmitting(false);
    }
  }

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      noValidate
      className="grid gap-5 sm:grid-cols-2"
    >
      {fields.map((field) => (
        <FieldControl
          key={field.name}
          field={field}
          value={values[field.name] ?? ""}
          error={errors[field.name]}
          inputId={`${baseId}-${field.name}`}
          errorId={`${baseId}-${field.name}-error`}
          helperId={`${baseId}-${field.name}-helper`}
          onChange={(v) => set(field.name, v)}
        />
      ))}

      {/* Honeypot. Off screen for humans, irresistible to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor={`${baseId}-company`}>Company</label>
        <input
          ref={honeypot}
          id={`${baseId}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {formError ? (
        <p
          role="alert"
          className="border-l-2 border-ember pl-4 text-sm leading-relaxed text-ember-2 sm:col-span-2"
        >
          {formError}
        </p>
      ) : null}

      <div className="sm:col-span-2">
        <Button
          type="submit"
          size="lg"
          arrow
          disabled={submitting}
          className="w-full sm:w-auto"
        >
          {submitting ? "Sending" : submitLabel}
        </Button>

        {note ? (
          <p className="mt-4 max-w-[52ch] text-xs leading-relaxed text-bone-3">
            {note}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function FieldControl({
  field,
  value,
  error,
  inputId,
  errorId,
  helperId,
  onChange,
}: {
  field: Field;
  value: string;
  error?: string;
  inputId: string;
  errorId: string;
  helperId: string;
  onChange: (value: string) => void;
}) {
  const shared = {
    id: inputId,
    name: field.name,
    value,
    required: field.required,
    "aria-invalid": error ? true : undefined,
    /* Only reference the helper when it is actually rendered, otherwise the
       attribute points at an element that does not exist. */
    "aria-describedby": error ? errorId : field.helper ? helperId : undefined,
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => onChange(e.target.value),
  };

  const border = error ? INPUT_BAD : INPUT_OK;

  /* Consent ---------------------------------------------------------------- */
  if (field.kind === "consent") {
    return (
      <div className="sm:col-span-2">
        <label
          htmlFor={inputId}
          className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-bone-2"
        >
          <input
            id={inputId}
            name={field.name}
            type="checkbox"
            checked={value === "yes"}
            onChange={(e) => onChange(e.target.checked ? "yes" : "")}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              "mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 border bg-ink-2",
              error ? INPUT_BAD : INPUT_OK,
            )}
          />
          <span>{field.label}</span>
        </label>
        {error ? (
          <p id={errorId} className="mt-2 pl-7 text-sm text-ember-2">
            {error}
          </p>
        ) : null}
      </div>
    );
  }

  /* Select ----------------------------------------------------------------- */
  if (field.kind === "select") {
    return (
      <div className="sm:col-span-2">
        <Label htmlFor={inputId} required={field.required}>
          {field.label}
        </Label>
        <div className="relative">
          <select
            {...shared}
            className={cn(INPUT, border, "h-12 appearance-none pr-11")}
          >
            <option value="">Choose one</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <CaretDown
            size={15}
            weight="bold"
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-bone-3"
          />
        </div>
        <FieldFooter field={field} error={error} errorId={errorId} helperId={helperId} />
      </div>
    );
  }

  /* Textarea --------------------------------------------------------------- */
  if (field.kind === "textarea") {
    return (
      <div className="sm:col-span-2">
        <Label htmlFor={inputId} required={field.required}>
          {field.label}
        </Label>
        <textarea
          {...shared}
          rows={field.rows ?? 4}
          placeholder={field.placeholder}
          className={cn(INPUT, border, "min-h-[8.5rem] resize-y py-3 leading-relaxed")}
        />
        <FieldFooter field={field} error={error} errorId={errorId} helperId={helperId} />
      </div>
    );
  }

  /* Text / email / tel ----------------------------------------------------- */
  return (
    <div className={field.half ? "sm:col-span-1" : "sm:col-span-2"}>
      <Label htmlFor={inputId} required={field.required}>
        {field.label}
      </Label>
      <input
        {...shared}
        type={field.kind}
        autoComplete={field.autoComplete}
        placeholder={field.placeholder}
        inputMode={field.kind === "tel" ? "tel" : undefined}
        className={cn(INPUT, border, "h-12")}
      />
      <FieldFooter field={field} error={error} errorId={errorId} helperId={helperId} />
    </div>
  );
}

function Label({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[0.8125rem] font-medium text-bone-2"
    >
      {children}
      {required ? (
        <span aria-hidden="true" className="ml-1.5 text-ember">
          *
        </span>
      ) : null}
    </label>
  );
}

function FieldFooter({
  field,
  error,
  errorId,
  helperId,
}: {
  field: Field;
  error?: string;
  errorId: string;
  helperId: string;
}) {
  if (error) {
    return (
      <p id={errorId} className="mt-2 text-sm text-ember-2">
        {error}
      </p>
    );
  }
  if (field.helper) {
    return (
      <p id={helperId} className="mt-2 text-xs leading-relaxed text-bone-3">
        {field.helper}
      </p>
    );
  }
  return null;
}
