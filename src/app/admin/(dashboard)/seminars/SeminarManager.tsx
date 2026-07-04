"use client";

import { useActionState, useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Eye, EyeOff, AlertCircle } from "lucide-react";
import { saveSeminar, deleteSeminar, togglePublish, type SeminarFormState } from "./actions";
import { formatCurrency, formatDateRange } from "@/lib/format";

export type AdminSeminar = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  priceCents: number;
  capacity: number;
  description: string | null;
  published: boolean;
  registrations: number;
};

const initial: SeminarFormState = {};

export function SeminarManager({ seminars }: { seminars: AdminSeminar[] }) {
  const [editing, setEditing] = useState<AdminSeminar | null>(null);
  const [creating, setCreating] = useState(false);
  const open = creating || editing !== null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-teal-800">Seminars</h1>
          <p className="mt-1 text-ink-soft">Manage sessions, dates, and pricing.</p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setCreating(true);
          }}
          className="btn-primary"
        >
          <Plus className="h-4 w-4" /> New Seminar
        </button>
      </div>

      {seminars.length === 0 ? (
        <div className="card p-10 text-center text-ink-soft">
          No seminars yet. Create your first one.
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-cream-200 bg-cream-100 text-left text-xs uppercase tracking-wide text-ink-soft">
                  <th className="px-6 py-3 font-semibold">Dates</th>
                  <th className="px-6 py-3 font-semibold">Title</th>
                  <th className="px-6 py-3 font-semibold">Price</th>
                  <th className="px-6 py-3 font-semibold">Registered</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200">
                {seminars.map((s) => (
                  <tr key={s.id} className="hover:bg-cream-50">
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-ink">
                      {formatDateRange(s.startDate, s.endDate)}
                    </td>
                    <td className="max-w-xs truncate px-6 py-4 text-ink-soft">
                      {s.title}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {formatCurrency(s.priceCents)}
                    </td>
                    <td className="px-6 py-4">
                      {s.registrations} / {s.capacity}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          s.published
                            ? "bg-teal-50 text-teal-700"
                            : "bg-cream-200 text-ink-soft"
                        }`}
                      >
                        {s.published ? "Published" : "Hidden"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <form action={togglePublish}>
                          <input type="hidden" name="id" value={s.id} />
                          <input
                            type="hidden"
                            name="published"
                            value={String(s.published)}
                          />
                          <button
                            className="grid h-9 w-9 place-items-center rounded-lg text-ink-soft hover:bg-teal-50 hover:text-teal-700"
                            title={s.published ? "Unpublish" : "Publish"}
                          >
                            {s.published ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </form>
                        <button
                          onClick={() => {
                            setCreating(false);
                            setEditing(s);
                          }}
                          className="grid h-9 w-9 place-items-center rounded-lg text-ink-soft hover:bg-teal-50 hover:text-teal-700"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <form
                          action={deleteSeminar}
                          onSubmit={(e) => {
                            if (!confirm("Delete this seminar?")) e.preventDefault();
                          }}
                        >
                          <input type="hidden" name="id" value={s.id} />
                          <button
                            className="grid h-9 w-9 place-items-center rounded-lg text-rust-600 hover:bg-rust-500/10"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {open && (
        <SeminarModal
          seminar={editing}
          onClose={() => {
            setEditing(null);
            setCreating(false);
          }}
        />
      )}
    </div>
  );
}

function toDateInput(iso: string) {
  return new Date(iso).toISOString().slice(0, 10);
}

function SeminarModal({
  seminar,
  onClose,
}: {
  seminar: AdminSeminar | null;
  onClose: () => void;
}) {
  const [state, action, pending] = useActionState(saveSeminar, initial);

  useEffect(() => {
    if (state.ok) onClose();
  }, [state.ok, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/40 p-4 sm:p-8">
      <div className="card w-full max-w-2xl">
        <div className="flex items-center justify-between border-b border-cream-200 p-6">
          <h2 className="text-lg font-semibold text-teal-800">
            {seminar ? "Edit Seminar" : "New Seminar"}
          </h2>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-lg text-ink-soft hover:bg-cream-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form action={action} className="space-y-5 p-6">
          {seminar && <input type="hidden" name="id" value={seminar.id} />}

          {state.error && (
            <div className="flex items-center gap-2 rounded-xl bg-rust-500/10 px-4 py-3 text-sm text-rust-600">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {state.error}
            </div>
          )}

          <div>
            <label className="field-label">Title</label>
            <input
              name="title"
              defaultValue={seminar?.title ?? "AI, Financial Skills & Career Success — 2-Day Intensive"}
              className="field-input"
              required
            />
            {state.fieldErrors?.title && (
              <p className="mt-1 text-xs text-rust-600">{state.fieldErrors.title}</p>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="field-label">Start Date</label>
              <input
                type="date"
                name="startDate"
                defaultValue={seminar ? toDateInput(seminar.startDate) : ""}
                className="field-input"
                required
              />
            </div>
            <div>
              <label className="field-label">End Date</label>
              <input
                type="date"
                name="endDate"
                defaultValue={seminar ? toDateInput(seminar.endDate) : ""}
                className="field-input"
                required
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label className="field-label">Price (USD)</label>
              <input
                type="number"
                name="price"
                step="0.01"
                min="0"
                defaultValue={seminar ? seminar.priceCents / 100 : 1595}
                className="field-input"
                required
              />
            </div>
            <div>
              <label className="field-label">Capacity</label>
              <input
                type="number"
                name="capacity"
                min="1"
                defaultValue={seminar?.capacity ?? 40}
                className="field-input"
                required
              />
            </div>
            <div>
              <label className="field-label">Location</label>
              <input
                name="location"
                defaultValue={seminar?.location ?? "Online / Virtual"}
                className="field-input"
                required
              />
            </div>
          </div>

          <div>
            <label className="field-label">Description (optional)</label>
            <textarea
              name="description"
              rows={3}
              defaultValue={seminar?.description ?? ""}
              className="field-input resize-y"
            />
          </div>

          <label className="flex items-center gap-3 text-sm text-ink">
            <input
              type="checkbox"
              name="published"
              defaultChecked={seminar?.published ?? true}
              className="h-4 w-4 rounded border-cream-300 text-teal-600 focus:ring-teal-500"
            />
            Published (visible on the public site)
          </label>

          <div className="flex justify-end gap-3 border-t border-cream-200 pt-5">
            <button type="button" onClick={onClose} className="btn-outline">
              Cancel
            </button>
            <button type="submit" disabled={pending} className="btn-primary">
              {pending ? "Saving…" : "Save Seminar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
