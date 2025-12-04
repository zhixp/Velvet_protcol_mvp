# 🚀 QUICK START - Deploy & Test AI Outputs

**Goal:** Get Velvet Protocol live on Vercel and test Gemini + Imagen outputs.

**Time:** 15-30 minutes

---

## ✅ CURRENT STATUS

**What's Working NOW:**
- ✅ Complete UI (upload, prompt, mode selection)
- ✅ Demo credit system (in-memory counter)
- ✅ All animations and interactions
- ✅ No Firebase needed for testing

**What We're Testing:**
- 🧪 Lane 1: Gemini 1.5 Pro prompt analysis
- 🧪 Lane 2: Imagen-3.0 image generation
- 🧪 Quality of AI outputs per mode (Sport, Ethereal, Clay, Organic)

---

## 📋 PREREQUISITES

### 1. Google Cloud Account
- Create account at https://console.cloud.google.com
- Enable billing (you get $300 free credits)

### 2. Enable Vertex AI APIs
```bash
gcloud services enable aiplatform.googleapis.com
```

### 3. Create Service Account
```bash
# Create service account
gcloud iam service-accounts create velvet-ai \
  --display-name="Velvet Protocol"

# Grant Vertex AI permissions
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:velvet-ai@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/aiplatform.user"

# Create key (downloads JSON file)
gcloud iam service-accounts keys create velvet-key.json \
  --iam-account=velvet-ai@YOUR_PROJECT_ID.iam.gserviceaccount.com
```

**Keep this `velvet-key.json` safe!** You'll need it for Vercel.

---

## 🚀 DEPLOY TO VERCEL

### Step 1: Push to GitHub
```bash
cd d:/BUILDS_TOOLS/Velvet_ai

git init
git add .
git commit -m "Velvet Protocol - Testing MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/velvet-protocol.git
git push -u origin main
```

### Step 2: Import to Vercel
1. Go to https://vercel.com/new
2. Import your GitHub repo
3. **Framework:** Next.js (auto-detected)
4. Click **Deploy** (don't add env vars yet)

### Step 3: Add Environment Variables
In Vercel Dashboard → Settings → Environment Variables:

```env
# Required for AI testing
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=<paste contents of velvet-key.json>
```

**How to paste the JSON:**
```bash
# On Windows
type velvet-key.json | clip

# On Mac/Linux
cat velvet-key.json | pbcopy
```

Then paste the entire JSON string into Vercel.

### Step 4: Redeploy
After adding env vars:
- Go to Deployments tab
- Click ⋯ menu → Redeploy
- Wait ~2 minutes

---

## 🧪 TEST THE AI OUTPUTS

### Test 1: Upload & Basic Flow
1. Visit your Vercel URL: `https://velvet-protocol.vercel.app`
2. Upload a product image
3. Enter a prompt
4. Select a mode (Sport/Ethereal/Clay/Organic)
5. Click Generate

**Expected:** 
- Loading state shows for 3 seconds
- Alert shows "Generation complete!"
- Demo credits: 9/10

### Test 2: Connect Real APIs (Next Step)

Create `app/api/analyze/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { analyzeWithGemini } from '@/lib/prompt-engine';

export async function POST(request: NextRequest) {
  try {
    const { prompt, mode } = await request.json();
    
    const analysis = await analyzeWithGemini(prompt, mode);
    
    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Lane 1 error:', error);
    return NextResponse.json(
      { error: 'Analysis failed' },
      { status: 500 }
    );
  }
}
```

Create `app/api/generate/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { VertexAI } from '@google-cloud/vertexai';

export async function POST(request: NextRequest) {
  try {
    const { enhancedPrompt } = await request.json();
    
    const vertexAI = new VertexAI({
      project: process.env.GOOGLE_CLOUD_PROJECT_ID!,
      location: 'us-central1',
    });
    
    const generativeModel = vertexAI.getGenerativeModel({
      model: 'imagen-3.0-generate-001',
    });
    
    // Generate image
    const result = await generativeModel.generateImages({
      prompt: enhancedPrompt,
      numberOfImages: 1,
      aspectRatio: '1:1',
    });
    
    return NextResponse.json({
      imageUrl: result.images[0].url,
    });
  } catch (error) {
    console.error('Lane 2 error:', error);
    return NextResponse.json(
      { error: 'Generation failed' },
      { status: 500 }
    );
  }
}
```

Then update `handleGenerate()` in `app/page.tsx`:

```typescript
const handleGenerate = async () => {
  // ... validation ...
  
  setIsGenerating(true);
  
  try {
    // Lane 1: Analyze
    const analysisRes = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: userPrompt, mode: selectedMode }),
    });
    const analysis = await analysisRes.json();
    
    // Lane 2: Generate
    const generateRes = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enhancedPrompt: analysis.enhancedPrompt }),
    });
    const result = await generateRes.json();
    
    // Show result
    console.log('Generated image:', result.imageUrl);
    alert(`Success! Image generated.\n\nPrompt: ${analysis.directorScript}`);
    
    // Deduct credit
    setDemoCredits(prev => prev - 1);
  } catch (error) {
    console.error('Generation failed:', error);
    alert('Generation failed. Check console.');
  } finally {
    setIsGenerating(false);
  }
};
```

---

## 🎯 TESTING CHECKLIST

### UI Tests (No API needed)
- [ ] Page loads on Vercel
- [ ] Can upload image
- [ ] Image preview shows
- [ ] Can type prompt
- [ ] Can select mode
- [ ] Generate button works
- [ ] Demo credits decrease
- [ ] Reset button works

### API Tests (After connecting)
- [ ] Lane 1 returns enhanced prompt
- [ ] Lane 2 generates image
- [ ] Image displays correctly
- [ ] Each mode produces different aesthetic
- [ ] Error handling works

### Quality Tests (The Important Part!)
- [ ] **Sport Mode:** High energy, athletic feel?
- [ ] **Ethereal Mode:** Calm, wellness vibe?
- [ ] **Clay Mode:** Playful, tech aesthetic?
- [ ] **Organic Mode:** Luxurious, food-grade quality?

---

## 📊 WHAT TO MEASURE

### Image Quality Metrics
1. **Prompt Adherence:** Does it match the description?
2. **Mode Accuracy:** Does it capture the vibe?
3. **Professional Grade:** Commercial photography quality?
4. **Consistency:** Same prompt = similar results?

### Performance Metrics
1. **Lane 1 Speed:** Gemini analysis time
2. **Lane 2 Speed:** Imagen generation time
3. **Total Time:** End-to-end generation
4. **Cost Per Image:** Track Vertex AI billing

---

## 💰 COST TRACKING

### Current Costs (Testing Phase)
- **Lane 1 (Gemini):** FREE (AI Studio tier)
- **Lane 2 (Imagen):** ~$0.04 per image
- **Vercel Hosting:** FREE (Hobby plan)

### Budget Management
- Google Cloud: $300 free credits
- ~7,500 test images before paying
- Set billing alerts at $50, $100, $200

---

## 🐛 TROUBLESHOOTING

### "Cannot find module '@google-cloud/vertexai'"
```bash
npm install @google-cloud/vertexai
git add .
git commit -m "Add vertex ai dependency"
git push
```

### "Authentication error"
- Check `GOOGLE_CLOUD_PROJECT_ID` is correct
- Verify `GOOGLE_APPLICATION_CREDENTIALS` is full JSON
- Ensure service account has `roles/aiplatform.user`

### "Image generation failed"
- Check Vertex AI API is enabled
- Verify billing is active
- Check quota limits in Google Cloud Console

---

## ✅ SUCCESS CRITERIA

You're ready for real testing when:
- ✅ Vercel deployment is live
- ✅ Can upload images
- ✅ Lane 1 returns enhanced prompts
- ✅ Lane 2 generates images
- ✅ Images match the selected mode vibe
- ✅ Cost per image is acceptable (~$0.04)

---

## 🔮 NEXT STEPS AFTER TESTING

Once AI outputs look good:

1. **Add Firebase** (for real credit system)
2. **Implement payment** (Stripe integration)
3. **Scale up** (remove demo credits)
4. **Go live** (open to public)

But for now: **Focus on testing AI quality!** 🎨

---

**Ready?** Deploy to Vercel and start generating! 🚀

**Questions?** Check the console logs - everything is logged.

