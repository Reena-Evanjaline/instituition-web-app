import Link from "next/link";
import type { SeminarDTO } from "@/lib/seminars";
import { formatDateRange, formatSeats } from "@/lib/format";

export function SeminarCard({ seminar }: { seminar: SeminarDTO }) {
  const full = seminar.seatsLeft <= 0;
  return (
    <div className="flex flex-col items-center rounded-lg border border-cream-300 bg-cream-50 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-teal-500 hover:shadow-soft">
      <p className="font-display text-xl font-bold uppercase tracking-wide text-navy-600">
        {formatDateRange(seminar.startDate, seminar.endDate)}
      </p>
      <Link
        href={full ? "/contact" : `/register?seminar=${encodeURIComponent(seminar.id)}`}
        className="btn-accent mt-4 px-10 py-3 text-base"
        title={formatSeats(seminar.seatsLeft)}
      >
        {full ? "Join Waitlist" : "Register"}
      </Link>
    </div>
  );
}
