import { auth } from "@clerk/nextjs/server";
import { Events } from "@/lib/airtable";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const event = await Events.getById(id);
    return NextResponse.json(event);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
