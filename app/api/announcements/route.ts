import { auth } from "@clerk/nextjs/server";
import { Announcements } from "@/lib/airtable";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const all = await Announcements.getAll({ sort: [{ field: "published_at", direction: "desc" }] });
  const sorted = [...all.filter((a) => a.fields.pinned), ...all.filter((a) => !a.fields.pinned)];
  return NextResponse.json(sorted);
}
