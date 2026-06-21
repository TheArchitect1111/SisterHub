export async function triggerWebhook(
  envKey: string,
  payload: Record<string, unknown>
): Promise<{ success: boolean }> {
  const url = process.env[envKey];
  if (!url) {
    console.warn(`[make] ${envKey} is not set — skipping webhook`);
    return { success: false };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return { success: res.ok };
  } catch (err) {
    console.error(`[make] ${envKey} failed:`, err);
    return { success: false };
  }
}
