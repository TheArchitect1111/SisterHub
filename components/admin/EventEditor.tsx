"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AtRecord, EventFields } from "@/lib/airtable";

interface EventEditorProps {
  event?: AtRecord<EventFields>;
  mode: "create" | "edit";
}

const blank: Partial<EventFields> = {
  title: "", description: "", date: "", time: "", location: "", type: "Meeting", status: "Upcoming",
};

export function EventEditor({ event, mode }: EventEditorProps) {
  const router = useRouter();
  const [form, setForm] = useState<Partial<EventFields>>(event?.fields ?? blank);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof EventFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  async function save() {
    if (!form.title?.trim()) { setError("Title is required."); return; }
    setSaving(true);
    setError("");
    const url = mode === "create" ? "/api/admin/events" : `/api/admin/events/${event!.id}`;
    const method = mode === "create" ? "POST" : "PATCH";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      if (mode === "create") router.push("/portal/events");
      else router.refresh();
    } else {
      setError("Save failed. Try again.");
    }
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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
        <div style={{ gridColumn: "1 / -1" }}>
          {label("Title *")}
          <input value={form.title ?? ""} onChange={set("title")} style={inputStyle} placeholder="Event title" />
        </div>
        <div>
          {label("Date")}
          <input type="date" value={form.date ?? ""} onChange={set("date")} style={inputStyle} />
        </div>
        <div>
          {label("Time")}
          <input value={form.time ?? ""} onChange={set("time")} style={inputStyle} placeholder="e.g. 6:00 PM EST" />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          {label("Location")}
          <input value={form.location ?? ""} onChange={set("location")} style={inputStyle} />
        </div>
        <div>
          {label("Type")}
          <select value={form.type ?? "Meeting"} onChange={set("type")} style={{ ...inputStyle, cursor: "pointer" }}>
            <option>Meeting</option>
            <option>Social</option>
            <option>Community Service</option>
            <option>Fundraiser</option>
          </select>
        </div>
        <div>
          {label("Status")}
          <select value={form.status ?? "Upcoming"} onChange={set("status")} style={{ ...inputStyle, cursor: "pointer" }}>
            <option>Upcoming</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          {label("Description")}
          <textarea value={form.description ?? ""} onChange={set("description")} rows={4} style={{ ...inputStyle, resize: "vertical" }} />
        </div>
      </div>
      {error && <p style={{ color: "var(--color-danger)", fontSize: "0.875rem", margin: 0 }}>{error}</p>}
      <button
        onClick={save}
        disabled={saving}
        style={{ padding: "11px 28px", background: "var(--color-brand)", color: "#fff", border: "none", borderRadius: "var(--radius-md)", fontWeight: 700, fontSize: "0.875rem", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1, alignSelf: "flex-start", fontFamily: "inherit" }}
      >
        {saving ? "Saving…" : mode === "create" ? "Create Event" : "Save Changes"}
      </button>
    </div>
  );
}
