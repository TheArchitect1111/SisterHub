import { requireMember } from "@/lib/auth";
import { SisterHubPortalLayout } from "@/lib/chassis/SisterHubPortalLayout";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  await requireMember();

  return <SisterHubPortalLayout>{children}</SisterHubPortalLayout>;
}
