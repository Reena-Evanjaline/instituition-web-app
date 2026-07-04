import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL ?? "admin@aiinstitute.org";
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe123!";

const seminarDates: [string, string][] = [
  ["2026-07-30", "2026-07-31"],
  ["2026-08-13", "2026-08-14"],
  ["2026-08-27", "2026-08-28"],
  ["2026-09-10", "2026-09-11"],
  ["2026-09-24", "2026-09-25"],
];

async function main() {
  // ── Admin user ──────────────────────────────────────────────
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await prisma.adminUser.upsert({
    where: { email: ADMIN_EMAIL },
    update: {},
    create: {
      email: ADMIN_EMAIL,
      name: "Institute Admin",
      passwordHash,
    },
  });
  console.log(`✔ Admin ready: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);

  // ── Seminars ────────────────────────────────────────────────
  const existing = await prisma.seminar.count();
  if (existing === 0) {
    for (const [start, end] of seminarDates) {
      await prisma.seminar.create({
        data: {
          title: "AI, Financial Skills & Career Success — 2-Day Intensive",
          startDate: new Date(start),
          endDate: new Date(end),
          location: "Tulsa, Oklahoma",
          priceCents: 159500,
          capacity: 40,
          description:
            "A hands-on, two-day intensive covering practical AI, financial strength, and career growth for tribal professionals and community members.",
          published: true,
        },
      });
    }
    console.log(`✔ Created ${seminarDates.length} seminars`);
  } else {
    console.log(`• Seminars already exist (${existing}) — skipping`);
  }

  // ── A sample contact message so the inbox isn't empty ───────
  const msgCount = await prisma.contactMessage.count();
  if (msgCount === 0) {
    await prisma.contactMessage.create({
      data: {
        fullName: "Dawn Whitefeather",
        email: "dawn@example.org",
        organization: "Northern Plains Tribal College",
        subject: "Group Training",
        message:
          "We'd love to bring this training to our staff of 15. Do you offer group rates and on-site sessions?",
      },
    });
    console.log("✔ Added a sample contact message");
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
