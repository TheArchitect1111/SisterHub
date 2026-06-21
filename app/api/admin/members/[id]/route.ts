import { auth } from "@clerk/nextjs/server";
import { Members } from "@/lib/airtable";
import { meta } from "@/lib/session";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { userId, sessionClaims } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { role } = meta(sessionClaims);
  if (role !== "Admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const body = await request.json() as Record<string, unknown>;

  const allowed = ["first_name", "last_name", "email", "phone", "status", "role", "chapter", "bio", "avatar_url"];
  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) updates[key] = body[key];
  }

  const updated = await Members.update(id, updates);
  return NextResponse.json(updated);
}
