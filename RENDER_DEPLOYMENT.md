# 🚀 Render Deployment Fix Guide

## Issue: "Failed to load repository data"

This happens because:
1. Backend is sleeping (free tier sleeps after 15 mins)
2. CORS configuration
3. Frontend can't reach backend
4. Environment variables not set

---

## ✅ FIXED - Follow These Steps:

### 1. Update Backend on Render

**Important Settings:**

1. Go to your backend service on Render
2. Click **Environment** tab
3. Add these variables:
   ```
   NODE_ENV=production
   PORT=5000
   ```

4. Click **Settings** → Check:
   - Build Command: `npm install`
   - Start Command: `npm start` (NOT `npm run dev`)

5. **Manual Deploy** → Click "Deploy latest commit"

### 2. Update Frontend on Render

1. Go to your frontend static site on Render
2. Click **Environment** tab
3. Add this variable:
   ```
   REACT_APP_API_URL=https://your-backend-name.onrender.com
   ```
   ⚠️ **Replace with YOUR actual backend URL!**
   ⚠️ **NO trailing slash!**

4. Click **Redirects/Rewrites** tab
5. Add this rule:
   - Source: `/*`
   - Destination: `/index.html`
   - Action: `Rewrite`

6. **Manual Deploy** → Click "Clear cache & deploy"

### 3. Wait for Backend to Wake Up

⏰ **First request takes 30-60 seconds** because backend is sleeping!

After deployment:
1. Open backend URL directly: `https://your-backend.onrender.com/health`
2. Wait 30 seconds for it to start
3. You should see: `{"status":"ok","message":"Repository Memory System API is running"}`
4. NOW open your frontend URL
5. Click "Try Demo Repository"

---

## 🔧 Keep Backend Awake (Optional)

Free tier backend sleeps after 15 minutes of inactivity.

**Solution: Use UptimeRobot**

1. Go to https://uptimerobot.com (free)
2. Sign up
3. Add New Monitor:
   - Type: HTTP(s)
   - URL: `https://your-backend.onrender.com/health`
   - Monitoring Interval: 5 minutes
4. Save

✅ Now backend stays awake!

---

## 🐛 Debugging Steps

### Check Backend is Running:

Open in browser: `https://your-backend-name.onrender.com/health`

**Expected Response:**
```json
{
  "status": "ok",
  "message": "Repository Memory System API is running",
  "timestamp": "2025-12-31T..."
}
```

**If you get error:**
- Wait 30 seconds (backend waking up)
- Check Render logs: Dashboard → Your Service → Logs
- Look for errors

### Check Frontend Environment:

1. Open frontend in browser
2. Press F12 (DevTools)
3. Go to Console tab
4. Look for: `API Base URL: https://...`
5. Should show your backend URL (not localhost!)

### Test API Connection:

Open browser console on frontend and run:
```javascript
fetch('https://your-backend.onrender.com/health')
  .then(r => r.json())
  .then(console.log)
```

Should print the health response.

---

## 📋 Checklist

- [ ] Backend deployed on Render
- [ ] Backend URL copied (e.g., `https://xxx.onrender.com`)
- [ ] Frontend environment variable set: `REACT_APP_API_URL=https://xxx.onrender.com`
- [ ] Frontend redeployed after setting env var
- [ ] Backend health endpoint working
- [ ] Waited 30 seconds for backend to wake up
- [ ] Frontend can connect to backend
- [ ] UptimeRobot monitor added (optional)

---

## 🎯 Common Issues & Solutions

### Issue: "Cannot connect to backend"
**Solution:**
- Check REACT_APP_API_URL is set correctly
- NO http:// in front (already in code)
- NO trailing slash
- Redeploy frontend after changing env vars

### Issue: Backend logs show "Error: Cannot find module"
**Solution:**
- Build command should be: `npm install`
- Start command should be: `npm start`
- Root directory should be: `backend`

### Issue: Frontend shows "localhost:5000"
**Solution:**
- Environment variable not set
- Add `REACT_APP_API_URL` to frontend
- Must start with `REACT_APP_`
- Clear cache and redeploy

### Issue: CORS errors in console
**Solution:**
- Already fixed in code (allow all origins)
- Redeploy backend
- Clear browser cache

---

## ✅ Final Test

1. Open backend: `https://your-backend.onrender.com/health`
   - Should show JSON response
   
2. Open frontend: `https://your-frontend.onrender.com`
   - Should show login page
   
3. Click "Try Demo Repository"
   - Should load (might take 30 seconds first time)
   - Dashboard appears with data

4. Navigate to other pages
   - Onboarding Tour works
   - Ask Questions works
   - Starter Tasks works

---

## 🚀 Production-Ready!

Once everything works:
- ✅ Share frontend URL with judges
- ✅ Backend wakes up automatically on requests
- ✅ Data loads correctly
- ✅ All features work

**Your live URL:** `https://your-frontend.onrender.com`

---

## 💡 Pro Tips

1. **Test backend first** - Always check `/health` endpoint
2. **Wait for wake-up** - First request takes 30-60 seconds
3. **Use UptimeRobot** - Keep backend awake during presentation
4. **Clear cache** - When changing env vars, clear cache
5. **Check logs** - Render provides real-time logs

---

## 🆘 Still Not Working?

1. Check Render logs:
   - Backend logs for errors
   - Frontend build logs

2. Check browser console:
   - F12 → Console
   - Look for red errors

3. Verify environment variables:
   - Backend: NODE_ENV, PORT
   - Frontend: REACT_APP_API_URL

4. Try manual API test:
   ```bash
   curl https://your-backend.onrender.com/health
   ```

---

**Need more help?** Share:
1. Your backend URL
2. Your frontend URL
3. Console errors (screenshot)
4. Backend logs (from Render)

I'll help you debug! 🚀
