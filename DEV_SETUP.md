# Local Development Setup

## Running the project locally

This project requires two servers during local development:

**Quick start:** Run both in separate terminals:
```bash
npm run dev      # Frontend (port 3000)
npm run dev:api  # API server (port 8787)
```

### 1. Frontend (Vite dev server)
```bash
npm run dev
```
Runs on `http://localhost:3000`

### 2. API Server (for /api/subscribe endpoint)
```bash
npm run dev:api
```
Runs on `http://localhost:8787`

The Vite dev server proxies `/api/*` requests to the API server automatically.

## Environment Variables

Create a `.env` file in the project root (see `.env.example`):

```env
BREVO_API_KEY=your-brevo-api-key-here
BREVO_LIST_ID=10  # optional, defaults to 10
VITE_CHAT_BACKEND_URL=https://your-chat-backend-url
```

**Important:** 
- `BREVO_API_KEY` is server-side only (never exposed to browser)
- `VITE_*` prefixed variables are exposed to the frontend

## Production Deployment (Vercel)

### Deploy Steps:
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `BREVO_API_KEY` (required)
   - `BREVO_LIST_ID` (optional)
   - `VITE_CHAT_BACKEND_URL` (required for chat widget)

### How it works in production:
- Vercel automatically detects `api/subscribe.js` as a serverless function
- The endpoint is available at `/api/subscribe`
- No need to run `local-api-server.js` (Vercel handles routing)
- Frontend calls `/api/subscribe` → Vercel routes to serverless function

## API Endpoints

### POST /api/subscribe
Subscribe an email to Brevo mailing list.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (200):**
```json
{
  "message": "Subscribed successfully!"
}
```

**Error Response (400/500):**
```json
{
  "error": "Error details from Brevo or server"
}
```

## Troubleshooting

### Subscribe button returns 401 "Key not found"
- Check that `BREVO_API_KEY` is set in `.env` (local) or Vercel environment variables (production)
- Verify the API key is valid in your Brevo dashboard

### Local dev: ECONNREFUSED on /api/subscribe
- Make sure `npm run dev:api` is running in a separate terminal
- The API server must be running on port 8787

### Production: API endpoint not found
- Ensure `api/subscribe.js` is committed to your repository
- Check Vercel deployment logs for any build errors
