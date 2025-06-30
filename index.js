// backend/index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "https://abds059.github.io",
  methods: ["GET"],
  optionsSuccessStatus: 200
}));


app.get("/news", async (req, res) => {
    const { q, topic } = req.query;

    const baseUrl = "https://gnews.io/api/v4/top-headlines";
    const params = new URLSearchParams({
        token: process.env.GNEWS_API_KEY,
        lang: "en",
        country: "pk",
    });

    if (q) params.append("q", q);
    if (topic) params.append("topic", topic);

    const finalUrl = `${baseUrl}?${params.toString()}`;
    console.log("Fetching from:", finalUrl); // Debug

    try {
        const response = await fetch(finalUrl);
        const data = await response.json();

        console.log("Data received:", data); // Debug

        res.json(data);
    } catch (error) {
        console.error("Fetch failed:", error.message);
        res.status(502).json({ error: "Failed to fetch news", message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
