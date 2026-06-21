import { auth } from "@clerk/nextjs/server";
import { Dues } from "@/lib/airtable";
import { NextResponse } from "next/server";
import { meta } from "@/lib/session";

export async function GET() {
  const { userId, sessionClaims } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { airtableId } = meta(sessionClaims);
  if (!airtableId) return NextResponse.json([]);

  const dues = await Dues.forMember(airtableId);
  return NextResponse.json(dues);
}
