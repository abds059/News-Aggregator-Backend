// api/news.js
export default async function handler(req, res) {
  const { q, topic } = req.query;
  const API_KEY = process.env.GNEWS_API_KEY;

  const params = new URLSearchParams({
    token: API_KEY,
    lang: "en",
    country: "pk",
  });
  if (q) params.append("q", q);
  if (topic) params.append("topic", topic);

  try {
    const response = await fetch(`https://gnews.io/api/v4/top-headlines?${params}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
