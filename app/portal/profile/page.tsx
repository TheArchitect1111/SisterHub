"use client";

import { useEffect, useState } from "react";
import type { AtRecord, MemberFields } from "@/lib/airtable";

export default function ProfilePage() {
  const [member, setMember] = useState<AtRecord<MemberFields> | null>(null);
  const [form, setForm] = useState({ phone: "", bio: "", avatar_url: "" });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/member/me")
      .then((r) => r.json())
      .then((data: AtRecord<MemberFields>) => {
        setMember(data);
        setForm({ phone: data.fields.phone ?? "", bio: data.fields.bio ?? "", avatar_url: data.fields.avatar_url ?? "" });
      });
  }, []);

  async function save() {
    setSaving(true);
    await fetch("/api/member/me", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 13px", background: "var(--color-surface-2, #222230)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", color: "var(--color-text)", fontSize: "0.9rem", fontFamily: "inherit", outline: "none",
  };
  const lbl = (t: string) => <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "5px" }}>{t}</label>;

  if (!member) return <p style={{ color: "var(--color-text-muted)" }}>Loading…</p>;

  const f = member.fields;
  const initials = [f.first_name?.[0], f.last_name?.[0]].filter(Boolean).join("").toUpperCase();

  return (
    <div style={{ maxWidth: "600px" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "28px", letterSpacing: "-0.02em" }}>My Profile</h1>

      <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "32px" }}>
        <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "var(--color-brand)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontWeight: 700, color: "#fff", overflow: "hidden", flexShrink: 0 }}>
          {form.avatar_url ? <img src={form.avatar_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : initials}
        </div>
        <div>
          <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--color-text)" }}>{f.first_name} {f.last_name}</div>
          <div style={{ fontSize: "0.85rem", color: "var(--color-accent)", fontWeight: 600 }}>{f.role ?? "Member"}</div>
          <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginTop: "2px" }}>{f.email}</div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <div>{lbl("Phone")}<input value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} style={inputStyle} placeholder="+1 (555) 000-0000" /></div>
        <div>{lbl("Avatar URL")}<input value={form.avatar_url} onChange={(e) => setForm((p) => ({ ...p, avatar_url: e.target.value }))} style={inputStyle} placeholder="https://…" /></div>
        <div>{lbl("Bio")}<textarea value={form.bio} onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))} rows={4} style={{ ...inputStyle, resize: "vertical" }} /></div>
        {saved && <p style={{ color: "var(--color-success)", fontSize: "0.875rem", margin: 0 }}>Saved.</p>}
        <button onClick={save} disabled={saving} style={{ padding: "11px 28px", background: "var(--color-brand)", color: "#fff", border: "none", borderRadius: "var(--radius-md)", fontWeight: 700, fontSize: "0.875rem", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1, alignSelf: "flex-start", fontFamily: "inherit" }}>
          {saving ? "Saving…" : "Save Profile"}
        </button>
      </div>
    </div>
  );
}
