"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AtRecord, MemberFields } from "@/lib/airtable";

interface MemberEditorProps {
  member: AtRecord<MemberFields>;
}

export function MemberEditor({ member }: MemberEditorProps) {
  const router = useRouter();
  const f = member.fields;
  const [form, setForm] = useState({
    first_name: f.first_name ?? "",
    last_name: f.last_name ?? "",
    email: f.email ?? "",
    phone: f.phone ?? "",
    status: f.status ?? "Active",
    role: f.role ?? "Member",
    chapter: f.chapter ?? "",
    bio: f.bio ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  async function save() {
    setSaving(true);
    setError("");
    const res = await fetch(`/api/admin/members/${member.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) { setSaved(true); router.refresh(); }
    else { setError("Save failed. Try again."); }
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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
        {(["first_name", "last_name", "email", "phone", "chapter"] as const).map((k) => (
          <div key={k}>
            <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "5px" }}>
              {k.replace(/_/g, " ")}
            </label>
            <input value={form[k]} onChange={set(k)} style={inputStyle} />
          </div>
        ))}
        <div>
          <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "5px" }}>Status</label>
          <select value={form.status} onChange={set("status")} style={{ ...inputStyle, cursor: "pointer" }}>
            <option>Active</option>
            <option>Inactive</option>
            <option>Suspended</option>
          </select>
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "5px" }}>Role</label>
          <select value={form.role} onChange={set("role")} style={{ ...inputStyle, cursor: "pointer" }}>
            <option>Member</option>
            <option>Officer</option>
            <option>Admin</option>
          </select>
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "5px" }}>Bio</label>
          <textarea value={form.bio} onChange={set("bio")} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
        </div>
      </div>
      {error && <p style={{ color: "var(--color-danger)", fontSize: "0.875rem", margin: 0 }}>{error}</p>}
      {saved && <p style={{ color: "var(--color-success)", fontSize: "0.875rem", margin: 0 }}>Saved.</p>}
      <button
        onClick={save}
        disabled={saving}
        style={{ padding: "11px 28px", background: "var(--color-brand)", color: "#fff", border: "none", borderRadius: "var(--radius-md)", fontWeight: 700, fontSize: "0.875rem", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1, alignSelf: "flex-start", fontFamily: "inherit" }}
      >
        {saving ? "Saving…" : "Save Changes"}
      </button>
    </div>
  );
}
