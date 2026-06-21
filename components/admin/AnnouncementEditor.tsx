"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AnnouncementEditor() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", body: "", author: "", pinned: false });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  async function save() {
    if (!form.title.trim() || !form.body.trim()) { setError("Title and body are required."); return; }
    setSaving(true);
    setError("");
    const res = await fetch("/api/admin/announcements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, published_at: new Date().toISOString() }),
    });
    setSaving(false);
    if (res.ok) router.push("/portal/announcements");
    else setError("Save failed. Try again.");
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "9px 12px",
    background: "var(--color-bg)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-md)",
    color: "var(--color-text)",
    fontSize: "0.875rem",
    fontFamily: "inherit",
    outline: "none",
  };
  const label = (t: string) => (
    <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "5px" }}>{t}</label>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        {label("Title *")}
        <input value={form.title} onChange={set("title")} style={inputStyle} placeholder="Announcement title" />
      </div>
      <div>
        {label("Author")}
        <input value={form.author} onChange={set("author")} style={inputStyle} placeholder="Your name or role" />
      </div>
      <div>
        {label("Body *")}
        <textarea value={form.body} onChange={set("body")} rows={6} style={{ ...inputStyle, resize: "vertical" }} placeholder="Write your announcement…" />
      </div>
      <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem", color: "var(--color-text-muted)", cursor: "pointer" }}>
        <input type="checkbox" checked={form.pinned} onChange={(e) => setForm((p) => ({ ...p, pinned: e.target.checked }))} />
        Pin to top of feed
      </label>
      {error && <p style={{ color: "var(--color-danger)", fontSize: "0.875rem", margin: 0 }}>{error}</p>}
      <button
        onClick={save}
        disabled={saving}
        style={{ padding: "11px 28px", background: "var(--color-brand)", color: "#fff", border: "none", borderRadius: "var(--radius-md)", fontWeight: 700, fontSize: "0.875rem", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1, alignSelf: "flex-start", fontFamily: "inherit" }}
      >
        {saving ? "Posting…" : "Post Announcement"}
      </button>
    </div>
  );
}
