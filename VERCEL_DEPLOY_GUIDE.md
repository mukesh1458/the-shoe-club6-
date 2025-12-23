# Vercel Deployment: The Shoe Club (Frontend)

To deploy your frontend on Vercel while keeping your backend on Render, follow these exact steps:

## 1. Import Project
1. Log in to [Vercel](https://vercel.com/).
2. Click **Add New** > **Project**.
3. Import your GitHub repository: `the-shoe-club6-`.

## 2. Framework & Directory Settings
On the "Configure Project" screen, you **MUST** change these:
- **Root Directory**: Click "Edit" and select the **`client`** folder.
- **Framework Preset**: Ensure it says **Vite**.
- **Install Command**: `npm install`
- **Build Command**: `npm run build`

- **Output Directory**: `dist`

## 3. Environment Variables (Critical)
1. Scroll down to **Environment Variables**.
2. Add this variable so the site knows where the backend is:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://the-shoe-club6.onrender.com`

## 4. Deploy
1. Click **Deploy**.
2. Vercel will build your app and give you a public URL (e.g., `the-shoe-club.vercel.app`).

---

### Why the `vercel.json` file?
I have added a `vercel.json` to your `client` folder. This fixes the common React problem where refreshing a page (like `/admin`) shows a Vercel 404. It tells Vercel to always load `index.html`.
