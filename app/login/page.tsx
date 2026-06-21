import { SisterHubLoginShell } from "./SisterHubLoginShell";

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <>
      <ErrorMessage searchParams={searchParams} />
      <SisterHubLoginShell />
    </>
  );
}

async function ErrorMessage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  if (!error) return null;

  const messages: Record<string, React.ReactNode> = {
    "not-registered": (
      <>Your email is not registered. <a href="/join">Request membership</a>.</>
    ),
    "account-inactive": <>Your account is inactive. Contact your chapter officer.</>,
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        maxWidth: 360,
        width: "calc(100% - 32px)",
        padding: "12px 16px",
        background: "rgba(224,82,82,0.12)",
        border: "1px solid rgba(224,82,82,0.3)",
        borderRadius: 8,
        color: "#E05252",
        fontSize: "0.875rem",
      }}
    >
      {messages[error] ?? "An error occurred. Please try again."}
    </div>
  );
}
