# Kokomo Games – Web App

Welcome to the Kokomo Games Web App. This is a Next.js application designed to provide a real-time, crypto-integrated gaming experience.

---

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser to see the app running.

You can start editing the UI by modifying `app/page.tsx`. The page will auto-update as you make changes.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to optimize and load [Geist](https://vercel.com/font), a new font family from Vercel.

---

## 🔐 Environment Variables

To run this project locally or in production, make sure the following environment variables are set in a `.env.local` or `.env` file:

### API and Server Configuration

- `NEXT_PUBLIC_APP_API_BASE_URL` – Base URL of your backend API (e.g., `https://kokomogames.com/api/v1` or `http://localhost:4000/api/v1`)
- `NEXT_PUBLIC_SOCKET_SERVER_URL` – WebSocket server URL used for real-time gameplay updates
- `NEXT_PUBLIC_APP_TOKEN` – Application-level token for request authentication

### Security and Cryptography

- `NEXT_PUBLIC_COMMON_KEY` – Public/shared key used by both frontend and backend
- `NEXT_PUBLIC_ENCRYPTION_KEY` – **Sensitive** encryption key; must be strong and kept private
- `API_AUTH_SECRET` – Secret string used to authenticate internal/backend API requests

### App Metadata

- `NEXT_PUBLIC_APP_VERSION` – Display version string (e.g., `v1.0.0` or `27 Jan 2024`)

### 🔌 Third-Party Integrations

These environment variables are used to connect with external services for Web3, analytics, and wallet integrations.

- **`NEXT_PUBLIC_THIRDWEB_CLIENT_ID`**
  Client ID from [Thirdweb](https://thirdweb.com/).
  👉 To get it:

  1. Sign up or log in at [thirdweb.com](https://thirdweb.com/).
  2. Go to the **Dashboard** → **Settings** → **API Keys**.
  3. Click **Create API Key**, and copy the **Client ID**.

- **`NEXT_PUBLIC_MIXPANEL_TOKEN`**
  Token for [Mixpanel](https://mixpanel.com/) to track analytics events.
  👉 To get it:

  1. Sign in at [mixpanel.com](https://mixpanel.com/).
  2. Create a new project or select an existing one.
  3. Go to **Settings** → **Projects** → find your **Project Token**.

- **`NEXT_PUBLIC_WAGMI_WALLET_CONNECT_PROJECT_ID`**
  Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/).
  👉 To get it:

  1. Go to [cloud.walletconnect.com](https://cloud.walletconnect.com/).
  2. Log in and create a new **Project**.
  3. Copy the **Project ID** from your project's settings.

- **`PLAYFULL_CLIENT_ID`**, **`PLAYFULL_CLIENT_SECRET`**, **`PLAYFULL_GAME_ID`**
  Credentials from [Playfull](https://www.playfull.com/) to integrate gaming features.
  👉 To get them:

  1. Contact the Playfull team or sign up through their partnership or developer portal.
  2. Once registered, your dashboard will show the **Client ID**, **Client Secret**, and **Game ID**.
  3. If you don’t see them, reach out to Playfull support for access.

> ⚠️ **Never expose `Client Secret` or sensitive tokens in the frontend or public repositories.** Use environment variables securely.

---

## 📚 Learn More

To dive deeper into Next.js, check out:

- [Next.js Documentation](https://nextjs.org/docs) – Learn about Next.js features and APIs.
- [Learn Next.js](https://nextjs.org/learn) – Interactive tutorial to master the framework.
- [Next.js GitHub](https://github.com/vercel/next.js) – Explore the source and contribute!

---

## ▲ Deploy on Vercel

The easiest way to deploy this Next.js app is with [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) – from the creators of Next.js.

Check the official [Next.js Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying) for configuration and tips.

---

## 🛠 License & Contributions

Feel free to contribute by opening a pull request. For major changes, please open an issue first.
License details coming soon.
