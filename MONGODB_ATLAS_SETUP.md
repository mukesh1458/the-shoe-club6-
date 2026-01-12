# MongoDB Atlas Setup & Connection String Guide

## Your MongoDB Atlas Connection Details

**Connection String Provided:**
```
mongodb+srv://awsfreeacc123_db_user:theshoeclub@666@cluster0.4xibp6w.mongodb.net/
```

---

## ⚠️ IMPORTANT: URL Encoding for Special Characters

Your password appears to be `theshoeclub@666`, which contains the `@` symbol. This is a special character in URLs and **must be URL-encoded**.

### URL-Encoded Connection String

**Use this corrected connection string:**

```
mongodb+srv://awsfreeacc123_db_user:theshoeclub%40666@cluster0.4xibp6w.mongodb.net/theshoeclub
```

**Key change:** `@` in password → `%40`

---

## Common Special Characters & Their Encodings

If your password contains any of these characters, you must encode them:

| Character | URL Encoded |
|-----------|-------------|
| `@` | `%40` |
| `:` | `%3A` |
| `/` | `%2F` |
| `?` | `%3F` |
| `#` | `%23` |
| `[` | `%5B` |
| `]` | `%5D` |
| `%` | `%25` |
| `&` | `%26` |

---

## MongoDB Atlas Network Access Configuration

To allow your deployed application to connect to MongoDB Atlas:

1. **Log in to MongoDB Atlas**
   - Go to [cloud.mongodb.com](https://cloud.mongodb.com)

2. **Navigate to Network Access**
   - In the left sidebar, click **Network Access** (under Security)

3. **Add IP Address**
   - Click **+ ADD IP ADDRESS**
   - Choose one of these options:
     - **Option A (Recommended for Development/Testing):** 
       - Click **ALLOW ACCESS FROM ANYWHERE**
       - This adds `0.0.0.0/0` (allows all IPs)
     - **Option B (More Secure for Production):**
       - Add Render's specific IP ranges (check Render documentation)

4. **Confirm**
   - Click **Confirm**
   - Wait a few minutes for changes to propagate

> [!WARNING]
> Allowing access from anywhere (`0.0.0.0/0`) is convenient for development but less secure. For production, consider restricting to specific IP ranges.

---

## Database Name Configuration

The connection string should include your database name. Choose one:

### Option 1: Add database name to connection string (Recommended)
```
mongodb+srv://awsfreeacc123_db_user:theshoeclub%40666@cluster0.4xibp6w.mongodb.net/theshoeclub
```
The database name here is `theshoeclub`

### Option 2: Let MongoDB create a default database
```
mongodb+srv://awsfreeacc123_db_user:theshoeclub%40666@cluster0.4xibp6w.mongodb.net/
```
MongoDB will use the default database (usually `test`)

**Recommendation:** Use Option 1 and specify `theshoeclub` as your database name.

---

## Testing Your Connection Locally

Before deploying, test the connection locally:

1. **Create a `.env` file** in the `server` folder (if not exists):
   ```bash
   # server/.env
   MONGO_URI=mongodb+srv://awsfreeacc123_db_user:theshoeclub%40666@cluster0.4xibp6w.mongodb.net/theshoeclub
   JWT_SECRET=your_local_jwt_secret_for_testing
   PORT=5000
   NODE_ENV=development
   ```

2. **Start your server:**
   ```bash
   cd server
   npm start
   ```

3. **Check the console output:**
   - ✅ Success: `MongoDB Connected: cluster0-shard-00-00.4xibp6w.mongodb.net`
   - ❌ Error: Check the error message for details

---

## MongoDB Atlas Additional Settings

### 1. Database User Verification
Ensure your user has the correct permissions:
- Go to **Database Access** (left sidebar)
- Find user: `awsfreeacc123_db_user`
- Ensure role is **"Atlas Admin"** or **"Read and write to any database"**

### 2. Connection String from Atlas
To get the official connection string:
1. Go to **Database** → **Connect**
2. Choose **Connect your application**
3. Select **Node.js** and version **4.1 or later**
4. Copy the connection string
5. Replace `<password>` with your actual password (URL-encoded)
6. Replace `<database>` with `theshoeclub`

---

## Final Connection Strings for Different Environments

### For Development (.env file locally)
```bash
MONGO_URI=mongodb+srv://awsfreeacc123_db_user:theshoeclub%40666@cluster0.4xibp6w.mongodb.net/theshoeclub
```

### For Production (Render Environment Variables)
```
Key: MONGO_URI
Value: mongodb+srv://awsfreeacc123_db_user:theshoeclub%40666@cluster0.4xibp6w.mongodb.net/theshoeclub
```

### For Production (Vercel - Frontend Only Needs This)
```
Key: VITE_API_URL
Value: https://your-render-backend-url.onrender.com
```

---

## Troubleshooting

### Error: "Authentication failed"
- Verify username is exactly: `awsfreeacc123_db_user`
- Verify password is URL-encoded: `theshoeclub%40666`
- Check Database Access in Atlas to ensure user exists

### Error: "Could not connect to any servers in your MongoDB Atlas cluster"
- Check Network Access settings in Atlas
- Ensure `0.0.0.0/0` is added to IP whitelist
- Wait 2-3 minutes after making changes

### Error: "MongoServerError: bad auth"
- Password might be incorrect or not properly URL-encoded
- Try resetting the password in MongoDB Atlas:
  1. Go to **Database Access**
  2. Click **EDIT** on your user
  3. Click **Edit Password**
  4. Set a new password (avoid special characters for simplicity)
  5. Update your connection string

---

## Security Best Practices

> [!CAUTION]
> **Never commit `.env` files to Git!**
> 
> Your `.env` file is already in `.gitignore`, but always verify:
> ```bash
> git status
> ```
> 
> If you see `.env` in the list, do NOT commit it!

> [!TIP]
> **Rotate your credentials regularly:**
> - Change JWT_SECRET every few months
> - Update MongoDB passwords periodically
> - Use different credentials for development and production

---

**Next Steps:** Follow the [RENDER_BACKEND_DEPLOY.md](./RENDER_BACKEND_DEPLOY.md) guide to deploy your backend! 🚀
