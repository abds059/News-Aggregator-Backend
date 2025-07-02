
import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader("Access-Control-Allow-Origin", "https://abds059.github.io");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { q, topic } = req.query;

  // Check if API key exists
  if (!process.env.GNEWS_API_KEY) {
    res.status(500).json({ error: "API key not configured" });
    return;
  }

  const params = new URLSearchParams({
    token: process.env.GNEWS_API_KEY,
    lang: "en",
    country: "pk",
  });

  if (q) params.append("q", q);
  if (topic) params.append("topic", topic);

  const finalUrl = `https://gnews.io/api/v4/top-headlines?${params.toString()}`;

  try {
    // Add timeout to prevent Vercel function timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(finalUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'NewsAggregator/1.0'
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`GNews API error: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    console.error('News API Error:', error);
    
    if (error.name === 'AbortError') {
      res.status(408).json({ error: "Request timeout" });
    } else if (error.message.includes('GNews API error')) {
      res.status(502).json({ error: "External API error" });
    } else {
      res.status(500).json({ error: "Failed to fetch news" });
    }
  }
}