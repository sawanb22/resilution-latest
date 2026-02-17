// api/subscribe.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Use BREVO_LIST_ID from environment when available, otherwise default to 10
  // eslint-disable-next-line no-undef
  const rawListId = process.env.BREVO_LIST_ID;
  const parsed = rawListId ? Number.parseInt(rawListId, 10) : NaN;
  const listId = Number.isFinite(parsed) ? parsed : 10;

  try {
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // eslint-disable-next-line no-undef
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: true,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      return res.status(400).json({ error });
    }

    return res.status(200).json({ message: "Subscribed successfully!" });
  } catch (err) {
    console.error("Subscribe error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
