# Render Deployment Guide: The Shoe Club

Follow these steps to deploy your project to Render.

## 1. Create a "Web Service" on Render
- Log in to your [Render Dashboard](https://dashboard.render.com/).
- Click **New** > **Web Service**.
- Connect your GitHub account and select the repository: `the-shoe-club6-`.

## 2. Configure Build Settings
- **Name**: `the-shoe-club` (or your choice)
- **Environment**: `Node`
- **Region**: Select the one closest to you (e.g., Oregon or Frankfurt)
- **Branch**: `main`
- **Root Directory**: Leave blank (root of the repo)
- **Build Command**: `npm run render-postbuild`
- **Start Command**: `npm run start-server`

## 3. Configure Environment Variables
Click on the **Environment** tab and add the following variables:
- `MONGO_URI`: `mongodb+srv://theshoeclub66_db_user:<password>@cluster0.lleseay.mongodb.net/theshoeclub?retryWrites=true&w=majority`

- `JWT_SECRET`: `supersecretkey_the_shoe_club` (or your own secret)
- `NODE_ENV`: `production`
- `PORT`: `5000`

## 4. Deploy!
- Click **Create Web Service**.
- Render will start building the frontend and backend.
- Once finished, you'll get a URL like `https://the-shoe-club.onrender.com`.

## ⚠️ Important Note on Frontend API
Ensure your frontend `API_BASE` is correctly picking up the production URL if it's not relative. In `AdminLogin.jsx`, it's already set to check `VITE_API_URL` or default to `localhost`. On Render, since we are serving the frontend *from* the backend, relative paths like `/api/...` will also work if configured in the frontend code. Currently, it's set to:
```javascript
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```
For Render, you can either:
1. Add `VITE_API_URL` to your Render environment variables pointing to your Render URL (e.g., `https://the-shoe-club.onrender.com`).
2. Update the code to use the window origin if in production.
