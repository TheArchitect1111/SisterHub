// Clerk v7 types publicMetadata as {} in JwtPayload.
// This helper narrows it to our known shape without ts-ignore.

export interface PortalMeta {
  role?: "Member" | "Officer" | "Admin";
  airtableId?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function meta(sessionClaims: any): PortalMeta {
  return (sessionClaims?.publicMetadata as PortalMeta | undefined) ?? {};
}
