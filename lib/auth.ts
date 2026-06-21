import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Members, type AtRecord, type MemberFields } from "@/lib/airtable";
import { meta } from "@/lib/session";

type ClerkUser = NonNullable<Awaited<ReturnType<typeof currentUser>>>;

export type AuthedMember = {
  userId: string;
  user: ClerkUser;
  member: AtRecord<MemberFields>;
  role: "Member" | "Officer" | "Admin";
};

export async function requireMember(): Promise<AuthedMember> {
  const user = await currentUser();
  if (!user) redirect("/login");

  const email = user.emailAddresses[0]?.emailAddress;
  if (!email) redirect("/login");

  const records = await Members.findByEmail(email);
  if (!records.length) redirect("/login?error=not-registered");

  const member = records[0];

  if (member.fields.status !== "Active") redirect("/login?error=account-inactive");

  const role = (member.fields.role as "Member" | "Officer" | "Admin") || "Member";

  // Sync clerk_user_id on first login
  if (!member.fields.clerk_user_id) {
    await Members.update(member.id, { clerk_user_id: user.id });
  }

  // Sync role + airtableId to Clerk publicMetadata if stale
  const { role: currentRole, airtableId: currentAirtableId } = meta(
    (await auth()).sessionClaims
  );
  if (currentRole !== role || currentAirtableId !== member.id) {
    const client = await clerkClient();
    await client.users.updateUserMetadata(user.id, {
      publicMetadata: { role, airtableId: member.id },
    });
  }

  return { userId: user.id, user, member, role };
}

export async function requireRole(requiredRole: "Officer" | "Admin"): Promise<AuthedMember> {
  const authed = await requireMember();
  const levels: Record<string, number> = { Member: 1, Officer: 2, Admin: 3 };
  if ((levels[authed.role] ?? 0) < (levels[requiredRole] ?? 0)) redirect("/portal");
  return authed;
}
