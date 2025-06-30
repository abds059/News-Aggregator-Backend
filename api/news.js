const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

export default async function handler(req, res) {
  const { q, topic } = req.query;

  const params = new URLSearchParams({
    token: process.env.GNEWS_API_KEY,
    lang: "en",
    country: "pk",
  });

  if (q) params.append("q", q);
  if (topic) params.append("topic", topic);

  const finalUrl = `https://gnews.io/api/v4/top-headlines?${params.toString()}`;

  try {
    const response = await fetch(finalUrl);
    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "https://abds059.github.io");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
