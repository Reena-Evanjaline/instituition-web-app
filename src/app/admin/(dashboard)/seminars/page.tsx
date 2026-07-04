import { prisma } from "@/lib/prisma";
import { SeminarManager, type AdminSeminar } from "./SeminarManager";

export default async function AdminSeminarsPage() {
  let seminars: AdminSeminar[] = [];
  try {
    const rows = await prisma.seminar.findMany({
      orderBy: { startDate: "asc" },
      include: { _count: { select: { registrations: true } } },
    });
    seminars = rows.map((r) => ({
      id: r.id,
      title: r.title,
      startDate: r.startDate.toISOString(),
      endDate: r.endDate.toISOString(),
      location: r.location,
      priceCents: r.priceCents,
      capacity: r.capacity,
      description: r.description,
      published: r.published,
      registrations: r._count.registrations,
    }));
  } catch {
    seminars = [];
  }

  return <SeminarManager seminars={seminars} />;
}
