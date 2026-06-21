import { requireMember } from "@/lib/auth";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const { user, member, role } = await requireMember();

  const firstName = user.firstName ?? member.fields.first_name ?? "Member";
  const imageUrl = user.imageUrl ?? undefined;

  return (
    <>
      <style>{`
        .portal-root {
          display: flex;
          min-height: 100vh;
          min-height: 100dvh;
          background: var(--color-bg);
        }
        .portal-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          overflow: hidden;
        }
        .portal-main {
          flex: 1;
          padding: 32px 36px;
          overflow-y: auto;
        }
        @media (max-width: 768px) {
          .portal-main { padding: 20px 16px; }
        }
      `}</style>

      <div className="portal-root">
        <Sidebar userFirstName={firstName} userImageUrl={imageUrl} role={role} />
        <div className="portal-body">
          <MobileNav userFirstName={firstName} role={role} />
          <main className="portal-main">{children}</main>
        </div>
      </div>
    </>
  );
}
