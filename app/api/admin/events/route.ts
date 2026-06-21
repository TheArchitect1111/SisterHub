import { auth } from "@clerk/nextjs/server";
import { Events } from "@/lib/airtable";
import { NextResponse } from "next/server";
import { isAdminRole } from "@/lib/utils";
import { meta } from "@/lib/session";

export async function POST(request: Request) {
  const { userId, sessionClaims } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { role } = meta(sessionClaims);
  if (!isAdminRole(role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json() as Record<string, unknown>;
  if (!body.title) return NextResponse.json({ error: "title is required" }, { status: 400 });

  const event = await Events.create(body);
  return NextResponse.json(event, { status: 201 });
}
