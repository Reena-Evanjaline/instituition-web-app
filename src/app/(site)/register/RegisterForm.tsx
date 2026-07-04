"use client";

import { useActionState, useState } from "react";
import {
  Lock,
  AlertCircle,
  ShieldCheck,
  User,
  Calendar,
  ClipboardList,
  HeartHandshake,
  Users,
  Droplet,
  Feather,
  Tag,
} from "lucide-react";
import { submitRegistration, type RegisterState } from "./actions";
import { formatCurrency, formatDateRange } from "@/lib/format";

type SeminarOption = {
  id: string;
  startDate: string;
  endDate: string;
  priceCents: number;
};

const roles = [
  "Finance / Accounting",
  "Grants / Program Manager",
  "Enterprise & Operations",
  "Workforce / Education",
  "Tribal Member / Job Seeker",
  "Other",
];

const describeOptions = [
  "Finance & Accounting",
  "Workforce / Education",
  "Grants & Program Manager",
  "Tribal Member / Job Seeker",
  "Enterprise & Operations",
  "Other",
];

const causeDefs = [
  {
    key: "women",
    name: "Protecting Native American Women",
    desc: "Support programs that provide safety, resources, and empowerment.",
    Icon: Users,
    ring: "bg-[#6b46a3]",
    text: "text-[#6b46a3]",
  },
  {
    key: "water",
    name: "Protecting Our Water",
    desc: "Safeguard clean water for our people, our lands, and future generations.",
    Icon: Droplet,
    ring: "bg-teal-600",
    text: "text-teal-700",
  },
  {
    key: "sovereignty",
    name: "Supporting Native American Sovereignty",
    desc: "Strengthen self-governance, protect rights, and build a strong future for our Nations.",
    Icon: Feather,
    ring: "bg-rust-500",
    text: "text-rust-600",
  },
] as const;

const initial: RegisterState = {};

function weekdayRange(startISO: string, endISO: string) {
  const opt = { weekday: "long" } as const;
  const s = new Date(startISO).toLocaleDateString("en-US", opt);
  const e = new Date(endISO).toLocaleDateString("en-US", opt);
  return `${s} – ${e}`;
}

export function RegisterForm({
  seminars,
  defaultSeminarId,
  stripeEnabled,
}: {
  seminars: SeminarOption[];
  defaultSeminarId?: string;
  defaultCause?: string;
  stripeEnabled: boolean;
}) {
  const [state, action, pending] = useActionState(submitRegistration, initial);
  const [seminarId, setSeminarId] = useState(
    defaultSeminarId ?? seminars[0]?.id ?? "",
  );
  const [contrib, setContrib] = useState<Record<string, string>>({
    women: "",
    water: "",
    sovereignty: "",
    custom: "",
  });

  const selected = seminars.find((s) => s.id === seminarId) ?? seminars[0];
  const seatPrice = selected?.priceCents ?? 159500;
  const contribCents = Object.values(contrib).reduce(
    (sum, v) => sum + Math.round((parseFloat(v || "0") || 0) * 100),
    0,
  );
  const totalCents = seatPrice + contribCents;
  const selectedCauses = causeDefs
    .filter((c) => (parseFloat(contrib[c.key] || "0") || 0) > 0)
    .map((c) => c.name);

  return (
    <form
      action={action}
      className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start"
    >
      {/* Hidden values the server action needs */}
      <input type="hidden" name="amountCents" value={totalCents} />
      <input type="hidden" name="cause" value={selectedCauses.join(", ")} />

      {/* ── Left column ─────────────────────────────────────────── */}
      <div className="space-y-8">
        {state.error && (
          <div className="flex items-center gap-2 rounded-xl bg-rust-500/10 px-4 py-3 text-sm text-rust-600">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {state.error}
          </div>
        )}

        <SectionHeader icon={User} title="Participant Information" />

        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full Name" name="fullName" required error={state.fieldErrors?.fullName} />
            <Field label="Email Address" name="email" type="email" required error={state.fieldErrors?.email} />
          </div>
          <Field label="Phone Number" name="phone" type="tel" required />
          <Field label="Organization / Tribe" name="organization" required />

          <div>
            <label htmlFor="role" className="field-label">
              Job Title / Role <span className="text-rust-500">*</span>
            </label>
            <select id="role" name="role" className="field-input" defaultValue="" required>
              <option value="" disabled>
                Select your role
              </option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="field-label">
              Which best describes you? <span className="text-rust-500">*</span>
            </p>
            <div className="mt-1 grid gap-3 sm:grid-cols-2">
              {describeOptions.map((o) => (
                <label key={o} className="flex items-center gap-2.5 text-sm text-ink">
                  <input
                    type="radio"
                    name="descriptor"
                    value={o}
                    required
                    className="h-4 w-4 border-cream-300 text-teal-600 focus:ring-teal-500"
                  />
                  {o}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Seminar dates */}
        <div id="dates" className="scroll-mt-28 space-y-4">
          <SectionHeader icon={Calendar} title="Select Seminar Date" />
          <div className="space-y-3">
            {seminars.map((s) => {
              const active = seminarId === s.id;
              return (
                <label
                  key={s.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                    active
                      ? "border-teal-600 bg-teal-50/60"
                      : "border-cream-300 bg-cream-50 hover:bg-cream-100"
                  }`}
                >
                  <input
                    type="radio"
                    name="seminarId"
                    value={s.id}
                    checked={active}
                    onChange={() => setSeminarId(s.id)}
                    className="h-4 w-4 border-cream-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span>
                    <span className="block font-semibold text-navy-600">
                      {formatDateRange(s.startDate, s.endDate)}
                    </span>
                    <span className="block text-xs text-ink-soft">
                      {weekdayRange(s.startDate, s.endDate)}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-cream-300 bg-teal-50/40 px-4 py-3">
            <ShieldCheck className="h-6 w-6 shrink-0 text-teal-700" />
            <p className="text-sm text-ink-soft">
              Your information is secure and will never be shared. We respect your privacy.
            </p>
          </div>
        </div>
      </div>

      {/* ── Right column ────────────────────────────────────────── */}
      <div className="space-y-6 lg:sticky lg:top-24">
        {/* Seminar summary */}
        <div className="card overflow-hidden">
          <div className="flex items-center gap-3 bg-teal-800 px-5 py-4">
            <ClipboardList className="h-5 w-5 text-cream-50" />
            <h3 className="font-display font-bold uppercase tracking-wide text-cream-50">
              Seminar Summary
            </h3>
          </div>
          <div className="space-y-4 p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                Selected Date:
              </p>
              <p className="font-display text-xl font-bold text-navy-600">
                {selected ? formatDateRange(selected.startDate, selected.endDate) : "—"}
              </p>
              {selected && (
                <p className="text-sm text-ink-soft">
                  {weekdayRange(selected.startDate, selected.endDate)}
                </p>
              )}
            </div>
            <p className="border-t border-cream-200 pt-4 text-sm text-ink-soft">
              2-Day Hands-On Training &nbsp;|&nbsp; Meals Included &nbsp;|&nbsp; Certificate Provided
            </p>
            <div className="flex items-start justify-between border-t border-cream-200 pt-4">
              <div>
                <p className="font-semibold text-ink">Registration Fee</p>
                <p className="mt-1 max-w-[16rem] text-xs text-ink-soft">
                  Includes training materials, breakfast, snacks, lunch both days, AI tool
                  resources, and certificate.
                </p>
              </div>
              <p className="font-display text-xl font-bold text-navy-600">
                {formatCurrency(seatPrice)}
              </p>
            </div>
          </div>
        </div>

        {/* Optional contributions */}
        <div className="card space-y-5 p-5">
          <div className="flex items-center gap-2.5">
            <HeartHandshake className="h-6 w-6 text-teal-700" />
            <div>
              <h3 className="font-display font-bold uppercase tracking-wide text-teal-800">
                Optional Contributions
              </h3>
              <p className="text-xs text-ink-soft">
                100% of contributions go directly to these causes.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {causeDefs.map((c) => (
              <div key={c.key} className="flex items-start gap-3">
                <span className={`mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full text-cream-50 ${c.ring}`}>
                  <c.Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-semibold ${c.text}`}>{c.name}</p>
                  <p className="text-xs text-ink-soft">{c.desc}</p>
                </div>
                <AmountInput
                  value={contrib[c.key]}
                  onChange={(v) => setContrib((prev) => ({ ...prev, [c.key]: v }))}
                />
              </div>
            ))}

            <div className="flex items-center justify-between gap-3 border-t border-cream-200 pt-4">
              <p className="text-sm text-ink">Custom Amount (optional)</p>
              <AmountInput
                value={contrib.custom}
                onChange={(v) => setContrib((prev) => ({ ...prev, custom: v }))}
              />
            </div>
          </div>
        </div>

        {/* Payment summary */}
        <div className="card space-y-4 p-5">
          <div className="flex items-center gap-2.5">
            <Tag className="h-5 w-5 text-teal-700" />
            <h3 className="font-display font-bold uppercase tracking-wide text-teal-800">
              Payment Summary
            </h3>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-ink-soft">Seminar Registration Fee</span>
              <span className="font-medium text-ink">{formatCurrency(seatPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-soft">Total Contributions</span>
              <span className="font-medium text-ink">{formatCurrency(contribCents)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-cream-200 pt-4">
            <span className="font-display text-xl font-bold text-teal-800">TOTAL</span>
            <span className="font-display text-2xl font-bold text-teal-800">
              {formatCurrency(totalCents)}
            </span>
          </div>

          <button
            type="submit"
            disabled={pending || totalCents < 100}
            className="btn-accent w-full"
          >
            <Lock className="h-4 w-4" />
            {pending ? "Processing…" : "Proceed to Secure Payment"}
          </button>

          <p className="flex items-center justify-center gap-2 text-center text-xs text-ink-soft">
            <Lock className="h-3.5 w-3.5 text-teal-600" />
            {stripeEnabled
              ? "Secure, encrypted checkout powered by Stripe."
              : "Demo mode — no real charge will be made."}
          </p>
        </div>
      </div>
    </form>
  );
}

function SectionHeader({
  icon: Icon,
  title,
}: {
  icon: typeof User;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-teal-800 text-cream-50">
        <Icon className="h-5 w-5" />
      </span>
      <h2 className="font-display text-xl font-bold uppercase tracking-wide text-navy-600">
        {title}
      </h2>
    </div>
  );
}

function AmountInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex shrink-0 items-center gap-1">
      <span className="text-sm text-ink-soft">$</span>
      <input
        type="number"
        min="0"
        step="0.01"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0.00"
        className="w-24 rounded-lg border border-cream-300 bg-white px-3 py-2 text-right text-sm focus:border-teal-500 focus:ring-teal-500"
      />
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="field-label">
        {label} {required && <span className="text-rust-500">*</span>}
      </label>
      <input id={name} name={name} type={type} required={required} className="field-input" />
      {error && <p className="mt-1 text-xs text-rust-600">{error}</p>}
    </div>
  );
}
