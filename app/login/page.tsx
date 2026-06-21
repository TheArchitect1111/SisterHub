import { SignIn } from "@clerk/nextjs";

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <>
      <style>{`
        .login-root {
          display: flex;
          min-height: 100vh;
          min-height: 100dvh;
        }
        .login-left {
          flex: 0 0 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px 40px;
          gap: 20px;
          background: var(--color-brand);
        }
        .login-logo-dot {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          background: rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.03em;
        }
        .login-portal-name {
          font-size: 2.2rem;
          font-weight: 800;
          color: #fff;
          margin: 0;
          font-family: var(--font-display);
          letter-spacing: -0.02em;
        }
        .login-tagline {
          color: rgba(255,255,255,0.75);
          font-size: 1rem;
          text-align: center;
          max-width: 300px;
          line-height: 1.6;
          margin: 0;
        }
        .login-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
          background: var(--color-bg);
          gap: 16px;
        }
        .login-error {
          max-width: 360px;
          width: 100%;
          padding: 12px 16px;
          background: rgba(224,82,82,0.12);
          border: 1px solid rgba(224,82,82,0.3);
          border-radius: var(--radius-md);
          color: var(--color-danger);
          font-size: 0.875rem;
          line-height: 1.5;
        }
        .login-error a { color: var(--color-accent); }
        @media (max-width: 768px) {
          .login-left { display: none; }
        }
      `}</style>

      <div className="login-root">
        <div className="login-left">
          <div className="login-logo-dot">S</div>
          <h1 className="login-portal-name">SisterHub</h1>
          <p className="login-tagline">Structure that lets sisterhood thrive.</p>
        </div>

        <div className="login-right">
          <ErrorMessage searchParams={searchParams} />
          <SignIn />
        </div>
      </div>
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
    "account-inactive": (
      <>Your account is inactive. Contact your chapter officer.</>
    ),
  };

  return (
    <div className="login-error">
      {messages[error] ?? "An error occurred. Please try again."}
    </div>
  );
}
