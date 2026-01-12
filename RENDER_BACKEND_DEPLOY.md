# Render Backend Deployment Guide: The Shoe Club

This guide will walk you through deploying your Node.js/Express backend to Render.

## Prerequisites
- A [Render.com](https://render.com/) account
- Your GitHub repository pushed with latest changes
- MongoDB Atlas connection string (already configured)

---

## Step 1: Create a New Web Service on Render

1. Log in to [Render](https://render.com/)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository: `the-shoe-club6-`

---

## Step 2: Configure Build Settings

On the configuration page, set the following:

### Basic Settings
- **Name**: `the-shoe-club-backend` (or your preferred name)
- **Region**: Choose the closest region to your users
- **Branch**: `main` (or your default branch)
- **Root Directory**: `server`
- **Runtime**: `Node`

### Build & Deploy Settings
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### Instance Type
- **Free** (for testing) or **Starter** (for production)

---

## Step 3: Environment Variables (CRITICAL)

Scroll down to **Environment Variables** and add the following:

| Key | Value |
|-----|-------|
| `MONGO_URI` | `mongodb+srv://awsfreeacc123_db_user:theshoeclub@666@cluster0.4xibp6w.mongodb.net/theshoeclub` |
| `JWT_SECRET` | Generate a strong random string (see below) |
| `NODE_ENV` | `production` |
| `PORT` | `5000` (Render will auto-assign, but this is fallback) |

### How to Generate a Secure JWT_SECRET

Run this command in your terminal:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy the output and use it as your `JWT_SECRET` value.

> [!IMPORTANT]
> **Never** commit your `.env` file to Git. The `.env` file should only exist on your local machine and production environment variables should be set in Render's dashboard.

---

## Step 4: Deploy

1. Click **Create Web Service**
2. Render will start building and deploying your app
3. Wait for the deployment to complete (usually 2-5 minutes)
4. You'll receive a public URL like: `https://the-shoe-club-backend.onrender.com`

---

## Step 5: Test Your Backend

Once deployed, test these endpoints:

```bash
# Health check
curl https://your-app-name.onrender.com/api/products

# Check if server is running
curl https://your-app-name.onrender.com
```

---

## Step 6: Update Frontend Environment Variable

After your backend is deployed, you need to update your frontend to point to the new backend URL.

1. Go to your Vercel dashboard (where your frontend is deployed)
2. Navigate to **Settings** → **Environment Variables**
3. Update or add `VITE_API_URL` to your Render backend URL:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-app-name.onrender.com`
4. Redeploy your frontend on Vercel

---

## Step 7: Update CORS Settings (If Needed)

Your backend already has CORS configured in `server/index.js`. After you get your Vercel URL for the frontend, make sure it's included in the CORS origins array.

If you need to add more origins, update the `server/index.js` file:

```javascript
app.use(cors({
  origin: [
    'https://your-vercel-url.vercel.app',  // Add your actual Vercel URL
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true
}));
```

Then commit and push the changes. Render will auto-deploy.

---

## Common Issues & Solutions

### Issue 1: "Cannot connect to MongoDB"
- Verify your `MONGO_URI` in Render environment variables is correct
- Check MongoDB Atlas Network Access: Add `0.0.0.0/0` to allow all IPs (or Render's IP ranges)

### Issue 2: "500 Internal Server Error"
- Check Render logs: Dashboard → Your Service → Logs
- Verify all environment variables are set correctly

### Issue 3: "CORS Error"
- Make sure your frontend URL is added to the CORS origins in `server/index.js`
- Redeploy after making changes

### Issue 4: Images not loading
- The `uploads` folder is gitignored, so images won't persist on Render's free tier
- For production, consider using cloud storage (AWS S3, Cloudinary, etc.)

---

## Auto-Deploy Setup

Render automatically deploys when you push to your main branch. To disable:
1. Go to your service settings
2. Scroll to **Auto-Deploy**
3. Toggle it off

---

## Important Notes

> [!WARNING]
> **Free Tier Limitations:**
> - Render's free tier spins down after 15 minutes of inactivity
> - First request after inactivity may take 30-60 seconds to respond
> - The `uploads` folder will be wiped on every deployment (ephemeral storage)

> [!TIP]
> For production use, upgrade to a paid plan for:
> - Always-on service (no spin-down)
> - Persistent storage
> - Better performance

---

## Next Steps

After successful deployment:
- [ ] Test all API endpoints
- [ ] Verify admin authentication works
- [ ] Test product creation and image uploads
- [ ] Connect frontend to backend
- [ ] Monitor logs for any errors

---

**Your backend is now live! 🎉**
