"use client";

import { useActionState } from "react";
import { CheckCircle2, Send, AlertCircle } from "lucide-react";
import { submitContact, type ContactState } from "./actions";

const subjects = [
  "Seminar Registration",
  "Group Training",
  "Partnerships",
  "Payment Question",
  "Other",
];

const initial: ContactState = { ok: false };

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);

  if (state.ok) {
    return (
      <div className="card flex flex-col items-center gap-4 p-10 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-teal-50 text-teal-600">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h3 className="text-xl font-semibold text-teal-800">Message sent!</h3>
        <p className="text-ink-soft">
          Thank you for reaching out. Our team will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="card space-y-5 p-6 sm:p-8">
      {state.error && (
        <div className="flex items-center gap-2 rounded-xl bg-rust-500/10 px-4 py-3 text-sm text-rust-600">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {state.error}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Full Name"
          name="fullName"
          placeholder="Jane Doe"
          error={state.fieldErrors?.fullName}
          required
        />
        <Field
          label="Email Address"
          name="email"
          type="email"
          placeholder="you@email.com"
          error={state.fieldErrors?.email}
          required
        />
      </div>

      <Field
        label="Organization / Tribe"
        name="organization"
        placeholder="Your Nation or organization"
      />

      <div>
        <label htmlFor="subject" className="field-label">
          Subject <span className="text-rust-500">*</span>
        </label>
        <select id="subject" name="subject" className="field-input" required defaultValue="">
          <option value="" disabled>
            Choose a subject…
          </option>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {state.fieldErrors?.subject && (
          <p className="mt-1 text-xs text-rust-600">{state.fieldErrors.subject}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="field-label">
          Message <span className="text-rust-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="How can we help?"
          className="field-input resize-y"
          required
        />
        {state.fieldErrors?.message && (
          <p className="mt-1 text-xs text-rust-600">{state.fieldErrors.message}</p>
        )}
      </div>

      <button type="submit" disabled={pending} className="btn-accent w-full sm:w-auto">
        {pending ? "Sending…" : "Send Message"}
        {!pending && <Send className="h-4 w-4" />}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  error,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="field-label">
        {label} {required && <span className="text-rust-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="field-input"
      />
      {error && <p className="mt-1 text-xs text-rust-600">{error}</p>}
    </div>
  );
}
