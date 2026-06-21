import { Members } from "@/lib/airtable";
import { triggerWebhook } from "@/lib/make";
import { NextResponse } from "next/server";

interface JoinPayload {
  first_name: string;
  last_name: string;
  email: string;
  chapter?: string;
  message?: string;
}

export async function POST(request: Request) {
  let body: Partial<JoinPayload>;
  try {
    body = await request.json() as Partial<JoinPayload>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { first_name, last_name, email } = body;
  if (!first_name || !last_name || !email) {
    return NextResponse.json({ error: "first_name, last_name, and email are required" }, { status: 400 });
  }

  // Create pending Airtable record
  await Members.create({
    first_name,
    last_name,
    email,
    chapter: body.chapter,
    status: "Inactive",
    role: "Member",
  });

  // Trigger Make.com for admin notification + applicant confirmation
  await triggerWebhook("MAKE_JOIN_WEBHOOK_URL", {
    first_name,
    last_name,
    email,
    chapter: body.chapter ?? "",
    message: body.message ?? "",
  });

  return NextResponse.json({ success: true }, { status: 201 });
}
