# 🚀 Complete Deployment Checklist: The Shoe Club

This is your step-by-step deployment checklist. Follow these in order to successfully deploy your application to production.

---

## ✅ Pre-Deployment Checklist

### 1. MongoDB Atlas Configuration
- [ ] Log in to [MongoDB Atlas](https://cloud.mongodb.com)
- [ ] Navigate to **Network Access** → Add IP `0.0.0.0/0` (allow all)
- [ ] Navigate to **Database Access** → Verify user `awsfreeacc123_db_user` exists
- [ ] Verify user has "Read and write to any database" permissions
- [ ] Test connection string locally (see step 2)

### 2. Test MongoDB Connection Locally
- [ ] Create `server/.env` file with the following content:
  ```bash
  MONGO_URI=mongodb+srv://awsfreeacc123_db_user:theshoeclub%40666@cluster0.4xibp6w.mongodb.net/theshoeclub
  JWT_SECRET=test_jwt_secret_local_only
  PORT=5000
  NODE_ENV=development
  ```
- [ ] Run `cd server` → `npm install` → `npm start`
- [ ] Verify console shows: `MongoDB Connected: cluster0...`
- [ ] If error occurs, see [MONGODB_ATLAS_SETUP.md](./MONGODB_ATLAS_SETUP.md)

### 3. Generate Production JWT Secret
- [ ] Run this command and save the output:
  ```bash
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```
- [ ] Keep this secret handy for Render deployment

### 4. Commit Latest Changes to GitHub
- [ ] Run: `git add .`
- [ ] Run: `git commit -m "Prepare for deployment with MongoDB Atlas"`
- [ ] Run: `git push origin main`

---

## 🖥️ Backend Deployment (Render)

### Step 1: Create Web Service
- [ ] Go to [Render.com](https://render.com) and log in
- [ ] Click **New +** → **Web Service**
- [ ] Connect GitHub repository: `the-shoe-club6-`

### Step 2: Configure Service Settings
- [ ] **Name**: `the-shoe-club-backend`
- [ ] **Region**: Select closest to you
- [ ] **Branch**: `main`
- [ ] **Root Directory**: `server`
- [ ] **Runtime**: `Node`
- [ ] **Build Command**: `npm install`
- [ ] **Start Command**: `npm start`

### Step 3: Set Environment Variables
Add these exactly as shown:

| Key | Value |
|-----|-------|
| `MONGO_URI` | `mongodb+srv://awsfreeacc123_db_user:theshoeclub%40666@cluster0.4xibp6w.mongodb.net/theshoeclub` |
| `JWT_SECRET` | (paste the secret you generated in step 3 above) |
| `NODE_ENV` | `production` |
| `PORT` | `5000` |

- [ ] All environment variables added
- [ ] Double-check `MONGO_URI` has `%40` not `@` in password

### Step 4: Deploy Backend
- [ ] Click **Create Web Service**
- [ ] Wait for deployment to complete (2-5 minutes)
- [ ] Copy your Render URL (e.g., `https://the-shoe-club-backend.onrender.com`)
- [ ] Test the URL in browser - should see an empty response or API message

---

## 🌐 Frontend Deployment (Vercel)

### Step 1: Update Frontend Environment Variable
- [ ] Go to [Vercel Dashboard](https://vercel.com)
- [ ] Find your project: `the-shoe-club` (or similar)
- [ ] Navigate to **Settings** → **Environment Variables**
- [ ] Update or add:
  - **Key**: `VITE_API_URL`
  - **Value**: `https://your-render-url.onrender.com` (from backend step 4)

### Step 2: Redeploy Frontend
- [ ] Go to **Deployments** tab
- [ ] Click `...` menu on the latest deployment
- [ ] Click **Redeploy**
- [ ] Wait for deployment to complete

---

## 🧪 Post-Deployment Testing

### Test Backend (Render)
- [ ] Visit: `https://your-render-url.onrender.com/api/products`
- [ ] Should see JSON response (might be empty array `[]`)
- [ ] Check Render Logs for any errors

### Test Frontend (Vercel)
- [ ] Visit your Vercel URL: `https://your-vercel-url.vercel.app`
- [ ] Homepage loads correctly
- [ ] Products display (if any exist)
- [ ] Admin login works
- [ ] Can create/edit/delete products

### Full Integration Test
- [ ] Log in to admin dashboard
- [ ] Create a new product with image
- [ ] Verify product appears on homepage
- [ ] Test from different device/browser
- [ ] Check that all animations work

---

## 🔧 Update CORS Settings (If Needed)

If you get CORS errors after deployment:

1. **Get your actual Vercel URL** (e.g., `https://the-shoe-club-xyz.vercel.app`)

2. **Update `server/index.js`:**
   ```javascript
   app.use(cors({
     origin: [
       'https://your-actual-vercel-url.vercel.app',  // Replace with real URL
       'https://the-shoe-clubv.vercel.app',
       'https://the-shoe-club-vercel.vercel.app',
       'http://localhost:5173',
       'http://localhost:3000'
     ],
     credentials: true
   }));
   ```

3. **Commit and push:**
   ```bash
   git add server/index.js
   git commit -m "Update CORS for production Vercel URL"
   git push origin main
   ```

4. **Render will auto-deploy** the changes

- [ ] CORS settings updated (if needed)
- [ ] Changes committed and pushed

---

## 📝 Important Notes & Limitations

### Render Free Tier
> [!WARNING]
> - **Spin down after 15 minutes** of inactivity
> - First request may take **30-60 seconds** to wake up
> - **Uploads folder is ephemeral** - images will be lost on redeploy
> 
> For production: Upgrade to paid plan or use cloud storage (Cloudinary, AWS S3)

### MongoDB Atlas Free Tier (M0)
- **512MB storage** limit
- **Shared CPU** resources
- Good for development/testing
- For high traffic: Upgrade to M2 or higher

### Vercel Free Tier
- **100GB bandwidth** per month
- Function execution limit: 100 hours/month
- Perfect for personal projects

---

## 🔒 Security Checklist

- [ ] `.env` file is **NOT** committed to Git (check `.gitignore`)
- [ ] JWT_SECRET is a strong random string (not the default)
- [ ] MongoDB password is properly URL-encoded
- [ ] MongoDB Network Access configured correctly
- [ ] Admin credentials are secure

---

## 🐛 Troubleshooting Common Issues

### Issue: "Cannot connect to MongoDB"
**Solution:**
1. Check MongoDB Atlas Network Access includes `0.0.0.0/0`
2. Verify `MONGO_URI` in Render environment variables
3. Check password is URL-encoded: `@` → `%40`

### Issue: "CORS Error" in frontend
**Solution:**
1. Add your Vercel URL to CORS origins in `server/index.js`
2. Commit and push changes
3. Wait for Render to redeploy

### Issue: "500 Internal Server Error"
**Solution:**
1. Check Render Logs: Dashboard → Your Service → Logs
2. Look for MongoDB connection errors
3. Verify all environment variables are set

### Issue: Render service is slow/not responding
**Solution:**
- Free tier spins down after inactivity
- Wait 30-60 seconds for first request
- Consider upgrading to paid plan

### Issue: Uploaded images disappear
**Solution:**
- This is expected on Render free tier (ephemeral storage)
- Implement cloud storage solution (recommended)
- Or upgrade to Render plan with persistent storage

---

## 📚 Reference Documents

- [MONGODB_ATLAS_SETUP.md](./MONGODB_ATLAS_SETUP.md) - MongoDB connection guide
- [RENDER_BACKEND_DEPLOY.md](./RENDER_BACKEND_DEPLOY.md) - Detailed Render deployment
- [VERCEL_DEPLOY_GUIDE.md](./VERCEL_DEPLOY_GUIDE.md) - Frontend deployment guide

---

## 🎉 Success Criteria

Your application is successfully deployed when:
- ✅ Backend is accessible at Render URL
- ✅ Frontend is accessible at Vercel URL
- ✅ Admin can log in
- ✅ Products can be created/edited/deleted
- ✅ Products display on homepage
- ✅ No console errors in browser
- ✅ MongoDB connection is stable

---

**Congratulations! Your app is now live! 🚀**

## Next Steps After Deployment
1. Share your Vercel URL with users
2. Monitor Render logs for errors
3. Set up analytics (optional)
4. Consider upgrading to paid tiers for production
5. Implement cloud storage for images
6. Set up custom domain (optional)
