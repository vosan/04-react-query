# Movie Search

A React and TypeScript application for finding movies with the TMDB API and
viewing their details in a modal.

## Setup

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and replace the placeholder with your TMDB API
   read access token:

   ```env
   VITE_TMDB_TOKEN=your_tmdb_read_access_token
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

The token is sent to TMDB as a Bearer token and is never stored in the source
code. Add the same `VITE_TMDB_TOKEN` environment variable to the Vercel project
before deploying.

## Checks

```bash
npm run format:check
npm run lint
npm run build
```
