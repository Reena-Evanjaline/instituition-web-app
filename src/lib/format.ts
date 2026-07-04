export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/** "July 30–31, 2026" style range (collapses same month/year). */
export function formatDateRange(
  start: Date | string,
  end: Date | string,
): string {
  const s = new Date(start);
  const e = new Date(end);
  const month = (d: Date) => d.toLocaleDateString("en-US", { month: "long" });
  const sameMonth = s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear();
  if (sameMonth) {
    return `${month(s)} ${s.getDate()}–${e.getDate()}, ${e.getFullYear()}`;
  }
  return `${formatDate(s)} – ${formatDate(e)}`;
}
