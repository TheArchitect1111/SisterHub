import { auth } from "@clerk/nextjs/server";
import { Members } from "@/lib/airtable";
import { NextResponse } from "next/server";
import { meta } from "@/lib/session";

export async function GET() {
  const { userId, sessionClaims } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { airtableId } = meta(sessionClaims);
  if (!airtableId) return NextResponse.json({ error: "Member record not found" }, { status: 404 });

  try {
    const member = await Members.getById(airtableId);
    const { clerk_user_id: _, ...safeFields } = member.fields;
    return NextResponse.json({ ...member, fields: safeFields });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function PATCH(request: Request) {
  const { userId, sessionClaims } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { airtableId } = meta(sessionClaims);
  if (!airtableId) return NextResponse.json({ error: "Member record not found" }, { status: 404 });

  const body = await request.json() as Record<string, unknown>;
  const allowed = ["phone", "bio", "avatar_url"];
  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) updates[key] = body[key];
  }

  const updated = await Members.update(airtableId, updates);
  return NextResponse.json(updated);
}
