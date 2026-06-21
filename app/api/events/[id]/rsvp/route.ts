import { auth } from "@clerk/nextjs/server";
import { Events, Members } from "@/lib/airtable";
import { triggerWebhook } from "@/lib/make";
import { NextResponse } from "next/server";
import { meta } from "@/lib/session";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { userId, sessionClaims } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { airtableId } = meta(sessionClaims);
  if (!airtableId) return NextResponse.json({ error: "Member record not found" }, { status: 404 });

  const { id } = await params;

  const event = await Events.getById(id);
  const current: string[] = event.fields.rsvp_members ?? [];
  const alreadyRsvped = current.includes(airtableId);

  const updated = alreadyRsvped
    ? current.filter((mid) => mid !== airtableId)
    : [...current, airtableId];

  await Events.update(id, { rsvp_members: updated });

  if (!alreadyRsvped) {
    const member = await Members.getById(airtableId);
    await triggerWebhook("MAKE_RSVP_WEBHOOK_URL", {
      member_email: member.fields.email,
      event_title: event.fields.title,
      event_date: event.fields.date,
      event_location: event.fields.location,
    });
  }

  return NextResponse.json({ rsvped: !alreadyRsvped });
}
