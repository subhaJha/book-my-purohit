# Book My Purohit

Bengali-first booking for home pujas in English Bazar and Old Malda. Customers can browse, request and track bookings in Bengali, Hindi or English. The React frontend uses the separate `book-my-purohit-api` FastAPI repository.

## Run locally

1. Start the FastAPI backend using the instructions in the sibling repository. It listens on port 8000 by default.
2. Run `npm ci` and `npm run dev` here. Open the URL Vite prints.
3. Staff sign in at `/admin` using the password configured on FastAPI.

The frontend forwards `/api` to `http://127.0.0.1:8000`. Set `BOOKING_API_URL` in `.env.local` if using a different backend origin. Configure the optional WhatsApp support number before building.

## Production

Run `npm run build` and `npm start` to serve the web app and forward API calls to FastAPI. Alternatively, serve `dist` with SPA routing and use your HTTPS reverse proxy to send `/api` directly to FastAPI. Keep tracking URLs out of access logs, and configure the SQLite volume and backups in the backend environment.

Customers receive private tracking links. Staff check purohit availability, post an itemized quote, and follow up with the family. The family accepts the quote to confirm. The dashboard is in English. Staff write samagri instructions in the customer's selected language.

## Vercel frontend

Use the Vite framework preset. In the existing project, set BOOKING_API_URL to the FastAPI service HTTPS origin, with no path. Create a preview deployment and verify that /api/health returns {"status":"ok"}. Also verify direct navigation to /account and a sign-in round trip before promoting the preview. The rewrite keeps API requests and session cookies on the frontend domain.

Run the backend on an HTTPS service with persistent SQLite storage, or migrate the backend to a managed database before deploying it as a Vercel Function. Never deploy the local administrator password or upload a local SQLite file with application source.
