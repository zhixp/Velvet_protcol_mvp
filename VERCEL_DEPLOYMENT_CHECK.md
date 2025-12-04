# 🔍 VERCEL DEPLOYMENT TROUBLESHOOTING

## Issue: Vercel Using Old Code

**Symptoms:**
- Console shows "🎨 Lane 2: Generating with Imagen-3.0..." (old message)
- Error shows "base model: imagegeneration" (suggests old model name)
- Code in GitHub is updated but Vercel isn't using it

---

## ✅ **SOLUTION 1: Force Vercel Redeploy**

### **Option A: Via Vercel Dashboard**
1. Go to https://vercel.com/dashboard
2. Select your project: `velvet-protcol-mvp`
3. Go to **Deployments** tab
4. Find the latest deployment
5. Click **⋯** (three dots) menu
6. Click **"Redeploy"**
7. Wait ~2-3 minutes

### **Option B: Via Vercel CLI**
```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login
vercel login

# Force redeploy
vercel --prod --force
```

### **Option C: Clear Vercel Cache**
1. Vercel Dashboard → Your Project → Settings
2. Scroll to **"Build & Development Settings"**
3. Click **"Clear Build Cache"**
4. Then redeploy

---

## ✅ **SOLUTION 2: Verify Deployment Status**

1. Go to Vercel Dashboard → Deployments
2. Check the **latest deployment**:
   - Status should be **"Ready"** (green)
   - Should show commit: `de5f9d0` or later
   - Should show "Update frontend console log to show imagegeneration@006"

3. If deployment is **"Building"** or **"Error"**:
   - Wait for it to complete
   - Check build logs for errors

---

## ✅ **SOLUTION 3: Verify Model Name Format**

The error shows: `"base model: imagegeneration"`

This suggests the model name might need to be different. Try these formats:

### **Format 1: Current (what we're using)**
```typescript
model: 'imagegeneration@006'
```

### **Format 2: Alternative (if Format 1 doesn't work)**
```typescript
model: 'imagegeneration-006'
```

### **Format 3: Full path (if needed)**
```typescript
model: 'projects/PROJECT_ID/locations/us-central1/publishers/google/models/imagegeneration@006'
```

---

## 🔍 **CHECK CURRENT DEPLOYMENT**

### **In Vercel Dashboard:**
1. Look at the **latest deployment commit hash**
2. Compare with GitHub: https://github.com/zhixp/Velvet_protcol_mvp/commits/main
3. If they don't match → Vercel hasn't deployed latest code

### **Check Build Logs:**
1. Click on the deployment
2. Check **"Build Logs"** tab
3. Look for any errors or warnings
4. Verify the model name in the logs

---

## 🚨 **IF STILL NOT WORKING**

### **Check Environment Variables:**
1. Vercel Dashboard → Settings → Environment Variables
2. Verify `GOOGLE_CLOUD_PROJECT_ID` is correct
3. Verify `GOOGLE_APPLICATION_CREDENTIALS` is valid JSON
4. **Redeploy after changing env vars**

### **Check Quota Status:**
The error shows you're hitting quota for "imagegeneration" model:
- Wait 1-2 minutes (quota resets per minute)
- Request quota increase: https://console.cloud.google.com/apis/api/aiplatform.googleapis.com/quotas
- Try a different model if available

---

## 📊 **VERIFICATION STEPS**

After redeploy, check:

1. **Browser Console:**
   - Should show: "🎨 Lane 2: Generating with imagegeneration@006..."
   - NOT: "🎨 Lane 2: Generating with Imagen-3.0..."

2. **Vercel Function Logs:**
   - Go to Vercel Dashboard → Your Project → Functions
   - Click on `/api/generate`
   - Check logs for: "📸 Generating image with imagegeneration@006..."

3. **Error Messages:**
   - If still seeing old errors → Vercel cache issue
   - Clear cache and redeploy

---

## 🎯 **QUICK FIX CHECKLIST**

- [ ] Latest code pushed to GitHub (commit `de5f9d0` or later)
- [ ] Vercel deployment shows latest commit
- [ ] Deployment status is "Ready" (not "Building")
- [ ] Cleared Vercel build cache
- [ ] Redeployed manually
- [ ] Waited 2-3 minutes after redeploy
- [ ] Hard refresh browser (Ctrl+Shift+R)
- [ ] Checked browser console for new log messages

---

**If all checked and still not working, the issue might be:**
1. Vercel deployment stuck (check build logs)
2. Browser cache (hard refresh)
3. Model name format incorrect (try alternative formats)
4. Quota still exceeded (wait or request increase)

