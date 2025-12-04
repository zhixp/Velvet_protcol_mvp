# 🚀 VERCEL DEPLOYMENT GUIDE

Quick guide to deploy Velvet Protocol to Vercel.

---

## 📋 PRE-DEPLOYMENT CHECKLIST

- [x] All code committed to Git
- [x] No linter errors
- [x] Environment variables documented
- [x] Build succeeds locally

---

## 🌐 STEP 1: PUSH TO GITHUB

```bash
# Initialize Git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Velvet Protocol MVP"

# Set main branch
git branch -M main

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/velvet-protocol.git

# Push
git push -u origin main
```

---

## 🔗 STEP 2: DEPLOY TO VERCEL

### Option A: Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name? velvet-protocol
# - Directory? ./
# - Want to modify settings? No

# Deploy to production
vercel --prod
```

### Option B: Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure:
   - **Framework:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`
4. Click **Deploy**

---

## 🔑 STEP 3: ADD ENVIRONMENT VARIABLES

In Vercel Dashboard → Your Project → Settings → Environment Variables:

### Required for Backend (Phase 2):

```env
# Google Cloud Vertex AI
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=<paste-service-account-json>

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

**Note:** For now, the UI will work without these. Add them when you're ready to connect the backend.

---

## ✅ STEP 4: VERIFY DEPLOYMENT

1. **Visit your deployment URL:**
   ```
   https://velvet-protocol.vercel.app
   ```

2. **Test the UI:**
   - ✅ Hero section loads
   - ✅ Drag & drop file upload works
   - ✅ Image preview shows
   - ✅ Mode selector works (inline version)
   - ✅ Prompt textarea works
   - ✅ Generate button shows loading state
   - ✅ Reset button works

3. **Check Browser Console:**
   - Should see: "File selected: [filename]"
   - Should see: "🚀 Starting Generation: ..."
   - Should see: "✅ Generation complete!"

---

## 🎨 WHAT WORKS NOW

### ✅ Fully Functional (No API needed):
- File upload (drag & drop + click)
- Image preview
- Mode selection (Sport, Ethereal, Clay, Organic)
- Prompt input with character counter
- Generate button with loading animation
- Reset functionality
- All animations and transitions

### ⚠️ Not Yet Connected:
- Lane 1 (Gemini analysis)
- Lane 2 (Imagen-3.0 generation)
- Firebase Auth
- Firestore credits

---

## 🔧 NEXT STEPS AFTER DEPLOYMENT

### Phase 2: Backend Integration

1. **Set up Google Cloud:**
   ```bash
   # Enable Vertex AI API
   gcloud services enable aiplatform.googleapis.com
   
   # Create service account
   gcloud iam service-accounts create velvet-ai \
     --display-name="Velvet Protocol Service Account"
   
   # Create key
   gcloud iam service-accounts keys create velvet-key.json \
     --iam-account=velvet-ai@YOUR_PROJECT_ID.iam.gserviceaccount.com
   ```

2. **Add API Routes:**
   - Create `app/api/analyze/route.ts` (Lane 1)
   - Create `app/api/generate/route.ts` (Lane 2)

3. **Wire up handleGenerate():**
   ```tsx
   const handleGenerate = async () => {
     // Step 1: Analyze with Gemini
     const analysis = await fetch('/api/analyze', {
       method: 'POST',
       body: JSON.stringify({ prompt: userPrompt, mode: selectedMode }),
     });
     
     // Step 2: Generate with Imagen
     const result = await fetch('/api/generate', {
       method: 'POST',
       body: JSON.stringify({ 
         enhancedPrompt: analysis.enhancedPrompt,
         image: uploadedFile 
       }),
     });
     
     // Display result
     setGeneratedImage(result.imageUrl);
   };
   ```

4. **Set up Firebase:**
   - Enable Anonymous Auth
   - Create Firestore database
   - Add credit system logic

---

## 📊 MONITORING

### Vercel Analytics (Free)
- Automatically tracks page views
- Real-time visitor data
- Performance metrics

### Check Deployment Logs:
```bash
vercel logs <deployment-url>
```

---

## 🐛 TROUBLESHOOTING

### Build Fails
```bash
# Test build locally first
npm run build

# If it works locally, check Vercel logs
vercel logs
```

### Environment Variables Not Working
- Ensure they're set for **Production** environment
- Redeploy after adding: `vercel --prod`

### 404 on Routes
- Next.js App Router is configured correctly
- All routes are in `app/` directory

---

## 🎉 SUCCESS METRICS

Your deployment is successful if:
- ✅ Site loads at your Vercel URL
- ✅ File upload works
- ✅ Mode selection works
- ✅ No console errors
- ✅ Animations are smooth
- ✅ Mobile responsive

---

## 📝 CUSTOM DOMAIN (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain: `velvet.yourdomain.com`
3. Follow DNS instructions
4. Wait for SSL certificate (automatic)

---

## 💰 COST ESTIMATE

### Vercel (UI Hosting):
- **Hobby Plan:** FREE
  - Unlimited deployments
  - 100GB bandwidth/month
  - Serverless functions (free tier)

### Google Cloud (When Backend Connected):
- **Lane 1 (Gemini 1.5 Pro):** $0 (Free Tier)
- **Lane 2 (Imagen-3.0):** ~$0.04 per image
- **Lane 2 (Veo Video):** ~$0.30 per video

### Total:
- **UI Only:** $0/month ✅
- **With Backend:** $0 + usage (starts at $0.04/image)

---

**Ready to deploy?** Run `vercel --prod` and watch your Velvet Protocol go live! 🚀

---

**Last Updated:** December 4, 2025  
**Status:** Ready for Production UI Deployment

