"use client";

import { useState } from "react";
import Link from "next/link";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-md)",
  color: "var(--color-text)",
  fontSize: "0.9rem",
  fontFamily: "inherit",
  outline: "none",
};

const label = (t: string) => (
  <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "5px" }}>
    {t}
  </label>
);

export default function JoinPage() {
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", chapter: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  async function submit() {
    if (!form.first_name || !form.last_name || !form.email) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const res = await fetch("/api/webhooks/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setStatus(res.ok ? "success" : "error");
  }

  if (status === "success") {
    return (
      <main style={{ minHeight: "100vh", background: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ textAlign: "center", maxWidth: "440px" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(76,175,130,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: "var(--color-success)", fontSize: "1.5rem" }}>✓</div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "10px" }}>Request Received</h2>
          <p style={{ color: "var(--color-text-muted)", lineHeight: 1.7, marginBottom: "6px" }}>
            Thank you, <strong style={{ color: "var(--color-text)" }}>{form.first_name}</strong>. A chapter officer will be in touch within 24–48 hours.
          </p>
          {form.email && (
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
              Confirmation sent to <strong style={{ color: "var(--color-text)" }}>{form.email}</strong>.
            </p>
          )}
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--color-bg)", fontFamily: "var(--font-body)" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 40px", borderBottom: "1px solid var(--color-border)", background: "var(--color-surface)" }}>
        <Link href="/" style={{ fontWeight: 700, fontSize: "1.1rem", textDecoration: "none", color: "var(--color-text)" }}>
          Sister<span style={{ color: "var(--color-accent)" }}>Hub</span>
        </Link>
        <Link href="/login" style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", textDecoration: "none" }}>
          Already a member? Sign in
        </Link>
      </nav>

      <div style={{ maxWidth: "520px", margin: "0 auto", padding: "56px 24px 80px" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
          Request Membership
        </h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "36px" }}>
          Complete this form and an officer will reach out to complete your onboarding.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>{label("First Name *")}<input value={form.first_name} onChange={set("first_name")} style={inputStyle} /></div>
            <div>{label("Last Name *")}<input value={form.last_name} onChange={set("last_name")} style={inputStyle} /></div>
          </div>
          <div>{label("Email *")}<input type="email" value={form.email} onChange={set("email")} style={inputStyle} /></div>
          <div>{label("Chapter / Organization")}<input value={form.chapter} onChange={set("chapter")} style={inputStyle} placeholder="e.g. Alpha Kappa Alpha – Gamma Chapter" /></div>
          <div>
            {label("Message (optional)")}
            <textarea value={form.message} onChange={set("message")} rows={4} style={{ ...inputStyle, resize: "vertical" }} placeholder="Why do you want to join?" />
          </div>

          {status === "error" && (
            <p style={{ color: "var(--color-danger)", fontSize: "0.875rem", margin: 0 }}>
              Please fill in all required fields and try again.
            </p>
          )}

          <button
            onClick={submit}
            disabled={status === "sending"}
            style={{ padding: "13px 32px", background: "var(--color-brand)", color: "#fff", border: "none", borderRadius: "var(--radius-md)", fontWeight: 700, fontSize: "0.9rem", cursor: status === "sending" ? "not-allowed" : "pointer", opacity: status === "sending" ? 0.7 : 1, fontFamily: "inherit" }}
          >
            {status === "sending" ? "Submitting…" : "Submit Request"}
          </button>
        </div>
      </div>
    </main>
  );
}
