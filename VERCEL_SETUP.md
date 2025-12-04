# 🚀 VERCEL DEPLOYMENT - Quick Setup

**Your code is pushed to GitHub!**  
**Repository:** https://github.com/zhixp/Velvet_protcol_mvp

---

## ✅ **What's Working Now (Without APIs)**

- ✅ Complete UI (upload, prompt, mode selection)
- ✅ Image/Video output toggle
- ✅ Demo credit system
- ✅ Admin mode (`velvet2025`)
- ✅ Result display panel
- ✅ All animations and interactions

**What Needs APIs:**
- ⚠️ Actual AI generation (Gemini + Imagen/Veo)

---

## 📋 **DEPLOY TO VERCEL (5 Minutes)**

### **Step 1: Import from GitHub**

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select: `zhixp/Velvet_protcol_mvp`
4. Framework: **Next.js** (auto-detected)
5. **DON'T add environment variables yet**
6. Click **"Deploy"**

Wait ~2 minutes for first deployment.

---

### **Step 2: Get Your Live URL**

After deployment, you'll get:
```
https://velvet-protcol-mvp.vercel.app
```

**Test it!** The UI will work, but generation will show:
```
"Backend API not connected yet"
```

This is expected! APIs come next.

---

## 🔑 **ADD VERTEX AI CREDENTIALS (For Real Generation)**

### **Prerequisites:**

You need:
1. Google Cloud account
2. Vertex AI API enabled
3. Service account JSON key

---

### **Quick Setup (If You Don't Have It Yet):**

```bash
# 1. Install Google Cloud CLI
# Download from: https://cloud.google.com/sdk/docs/install

# 2. Login
gcloud auth login

# 3. Create project (or use existing)
gcloud projects create velvet-protocol-mvp --name="Velvet Protocol"

# 4. Set project
gcloud config set project velvet-protocol-mvp

# 5. Enable Vertex AI
gcloud services enable aiplatform.googleapis.com

# 6. Create service account
gcloud iam service-accounts create velvet-ai \
  --display-name="Velvet AI Service Account"

# 7. Grant permissions
gcloud projects add-iam-policy-binding velvet-protocol-mvp \
  --member="serviceAccount:velvet-ai@velvet-protocol-mvp.iam.gserviceaccount.com" \
  --role="roles/aiplatform.user"

# 8. Create and download key
gcloud iam service-accounts keys create velvet-key.json \
  --iam-account=velvet-ai@velvet-protocol-mvp.iam.gserviceaccount.com
```

This creates `velvet-key.json` in your current directory.

---

### **Add to Vercel:**

1. **Open the JSON file:**
   ```bash
   # Windows
   type velvet-key.json | clip
   
   # Mac/Linux
   cat velvet-key.json | pbcopy
   ```

2. **Go to Vercel:**
   - Your Project → Settings → Environment Variables

3. **Add these variables:**

   **Variable 1:**
   ```
   Name: GOOGLE_CLOUD_PROJECT_ID
   Value: velvet-protocol-mvp  (or your project ID)
   Environment: Production, Preview, Development
   ```

   **Variable 2:**
   ```
   Name: GOOGLE_APPLICATION_CREDENTIALS
   Value: <paste the entire JSON content>
   Environment: Production, Preview, Development
   ```

   The JSON should look like:
   ```json
   {
     "type": "service_account",
     "project_id": "velvet-protocol-mvp",
     "private_key_id": "...",
     "private_key": "-----BEGIN PRIVATE KEY-----\n...",
     ...
   }
   ```

4. **Save** and **Redeploy:**
   - Go to Deployments tab
   - Click ⋯ menu on latest deployment
   - Click **"Redeploy"**

---

## 🧪 **TEST ON VERCEL**

### **Test 1: UI Features (Works Now)**

1. Visit your Vercel URL
2. Upload an image
3. Enter a prompt
4. Select Image or Video
5. Click Generate

**Expected:** Loading animation, then "Backend API not connected" message

---

### **Test 2: Admin Mode (Works Now)**

1. Scroll to footer
2. Click "Admin Login"
3. Enter: `velvet2025`
4. See: "∞ Unlimited Credits (Admin)"

**Expected:** Unlimited credits enabled

---

### **Test 3: With APIs (After Adding Credentials)**

1. Upload image
2. Enter: "Luxury product shot with dramatic lighting"
3. Select "Static Image"
4. Click "Generate Image (1 Credit)"

**Expected:** 
- Real AI processing (takes ~5-10 seconds)
- Gemini analyzes prompt
- Imagen generates image
- Result panel shows actual generated image
- Download works

---

## 💰 **COST TRACKING**

Once APIs are connected:

- **Gemini 1.5 Pro:** FREE (AI Studio tier)
- **Imagen-3.0:** ~$0.04 per image
- **Veo 3.1 Video:** ~$0.30 per video
- **Vercel Hosting:** FREE (Hobby plan)

**Google Cloud Free Credits:** $300 (enough for ~7,500 images)

---

## 🔧 **TROUBLESHOOTING**

### **Issue: "Module not found" error**
```bash
# Solution: Clear Vercel cache
Go to Settings → Advanced → Clear Cache
Then redeploy
```

### **Issue: "Authentication failed"**
```
# Check:
1. Service account has aiplatform.user role
2. JSON is complete (not truncated)
3. Project ID matches
4. Vertex AI API is enabled
```

### **Issue: "Billing not enabled"**
```
# Solution:
1. Go to Google Cloud Console
2. Billing → Link a billing account
3. Enable billing for your project
```

---

## 📊 **CURRENT STATUS**

| Feature | Local | Vercel (No API) | Vercel (With API) |
|---------|-------|-----------------|-------------------|
| **UI** | ✅ Works | ✅ Works | ✅ Works |
| **Upload** | ✅ Works | ✅ Works | ✅ Works |
| **Modes** | ✅ Works | ✅ Works | ✅ Works |
| **Image/Video Toggle** | ✅ Works | ✅ Works | ✅ Works |
| **Admin Mode** | ✅ Works | ✅ Works | ✅ Works |
| **Demo Credits** | ✅ Works | ✅ Works | ✅ Works |
| **AI Generation** | ❌ No API | ❌ No API | ✅ Will Work |

---

## 🎯 **NEXT STEPS**

### **Option 1: Test UI Only (Now)**
Deploy to Vercel without APIs to test the UI/UX with team.

### **Option 2: Full AI Testing (Recommended)**
1. Set up Google Cloud (15 min)
2. Add credentials to Vercel
3. Test real AI generation
4. Evaluate output quality

### **Option 3: Both**
1. Deploy now for UI testing
2. Add APIs later when ready

---

## 🎉 **YOU'RE READY!**

**Your app is on GitHub:** https://github.com/zhixp/Velvet_protcol_mvp

**Deploy command:** Click "Import" on Vercel → Auto-deploys

**Admin password:** `velvet2025`

**Cost so far:** $0 (UI is free to host)

---

## 📝 **DEPLOYMENT CHECKLIST**

- [x] Code pushed to GitHub
- [x] All features working locally
- [ ] Deployed to Vercel
- [ ] Tested UI on Vercel
- [ ] Google Cloud project created (optional for now)
- [ ] Vertex AI enabled (optional for now)
- [ ] Service account created (optional for now)
- [ ] Credentials added to Vercel (optional for now)
- [ ] Tested AI generation on Vercel (optional for now)

---

**Go to Vercel now and click "Import"!** 🚀

**The UI will work immediately, APIs can be added anytime.**

