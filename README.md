<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/0fd0bb68-dc87-4acf-99a5-d47a605ae998

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Contact Form

The contact form uses the `/api/contact` Vercel function. Configure `MONGO_URI`
and `RESEND_URI` in the Vercel project environment to save submissions and send
email. For local development, set these values in `.env` and run
`npm run dev:all` to start the frontend and backend.
