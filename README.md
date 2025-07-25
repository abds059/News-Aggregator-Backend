# News-Aggregator-Backend

This is the backend for the **News Aggregator** project. It securely handles API requests to [GNews API](https://gnews.io) and provides filtered news data to the frontend.

**Frontend Live Demo:**
[https://abds059.github.io/News-Aggregator-Frontend](https://abds059.github.io/News-Aggregator-Frontend)

---

## Features

* Hides API key securely using environment variables
* Acts as a proxy to GNews API (country: Pakistan, language: English)
* Accepts `q` (search keyword) and `topic` (category) query parameters
* CORS enabled to allow requests from GitHub Pages frontend

---

## Folder Structure

```
News-Aggregator-Backend/
│
├── api/
│   └── news.js         # Main API route handler
├── .env                # Stores API key(not pushed to GitHub)
├── vercel.json         # Optional config for Vercel deployment
├── package.json        # Project metadata and dependencies
└── README.md           
```

---

## How It Works

* Frontend makes a request to `/api/news`
* Backend adds the API key and other params (country, lang)
* Performs a request to the GNews API
* Returns parsed JSON back to the frontend

---

## Environment Variables

Create a `.env` file:

```
GNEWS_API_KEY=your_actual_api_key_here
```

> Never commit `.env` to GitHub!

---

## Run Locally

```bash
git clone https://github.com/abds059/News-Aggregator-Backend.git
```

Make sure `.env` is properly configured.

---

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import the GitHub project
4. Add your `GNEWS_API_KEY` in **Project Settings > Environment Variables**
5. Deploy 

---

## Example API Request

```
GET /api/news?q=pakistan&topic=politics
```

Returns JSON response like:

```json
{
  "articles": [
    {
      "title": "...",
      "description": "...",
      "source": { "name": "..." },
      "publishedAt": "..."
    }
  ]
}
```

---

## License

This backend is open-source and meant for educational purposes.
