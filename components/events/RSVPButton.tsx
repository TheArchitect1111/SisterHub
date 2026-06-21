"use client";

import { useState } from "react";
import { Check } from "lucide-react";

interface RSVPButtonProps {
  eventId: string;
  initialRsvped: boolean;
}

export function RSVPButton({ eventId, initialRsvped }: RSVPButtonProps) {
  const [rsvped, setRsvped] = useState(initialRsvped);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    try {
      const res = await fetch(`/api/events/${eventId}/rsvp`, { method: "POST" });
      if (res.ok) {
        const data = await res.json() as { rsvped: boolean };
        setRsvped(data.rsvped);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "10px 22px",
        borderRadius: "var(--radius-md)",
        border: rsvped ? "1px solid var(--color-success)" : "1px solid var(--color-brand)",
        background: rsvped ? "rgba(76,175,130,0.15)" : "var(--color-brand)",
        color: rsvped ? "var(--color-success)" : "#fff",
        fontSize: "0.875rem",
        fontWeight: 600,
        cursor: loading ? "not-allowed" : "pointer",
        opacity: loading ? 0.7 : 1,
        transition: "all 0.15s",
        fontFamily: "inherit",
      }}
    >
      {rsvped && <Check size={14} />}
      {loading ? "Saving…" : rsvped ? "You're going" : "RSVP"}
    </button>
  );
}
