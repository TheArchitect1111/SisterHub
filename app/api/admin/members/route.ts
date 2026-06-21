import { auth } from "@clerk/nextjs/server";
import { Members } from "@/lib/airtable";
import { NextResponse } from "next/server";
import { isAdminRole } from "@/lib/utils";
import { meta } from "@/lib/session";

export async function GET() {
  const { userId, sessionClaims } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { role } = meta(sessionClaims);
  if (!isAdminRole(role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const members = await Members.getAll({ sort: [{ field: "last_name", direction: "asc" }] });
  return NextResponse.json(members);
}
