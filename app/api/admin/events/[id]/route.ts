import { auth } from "@clerk/nextjs/server";
import { Events } from "@/lib/airtable";
import { meta } from "@/lib/session";
import { NextResponse } from "next/server";
import { isAdminRole } from "@/lib/utils";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { userId, sessionClaims } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { role } = meta(sessionClaims);
  if (!isAdminRole(role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const body = await request.json() as Record<string, unknown>;
  const updated = await Events.update(id, body);
  return NextResponse.json(updated);
}
