# 🧪 AI QUALITY TESTING GUIDE

**Status:** ✅ APIs Connected - Ready to Test  
**Pushed to GitHub:** https://github.com/zhixp/Velvet_protcol_mvp

---

## 🎯 **WHAT'S NOW LIVE**

### **Lane 1: Gemini 1.5 Pro** ✅
- Analyzes user prompts
- Detects emotional vibe
- Creates "Director's Script"
- Injects mode-specific tokens (Ohneis Method)
- **Cost:** FREE

### **Lane 2: Imagen-3.0** ✅
- Generates high-end product images
- Uses enhanced prompt from Lane 1
- **Cost:** ~$0.04 per image

### **Lane 2: Veo 3.1** ✅
- Generates cinematic videos
- Uses enhanced prompt from Lane 1
- **Cost:** ~$0.30 per video

---

## 🚀 **VERCEL WILL AUTO-DEPLOY**

Your push triggers automatic deployment. Wait ~2-3 minutes.

**Check deployment:** https://vercel.com/your-username/velvet-protcol-mvp

---

## 🔑 **VERIFY ENVIRONMENT VARIABLES**

Make sure these are set in Vercel:

```
GOOGLE_CLOUD_PROJECT_ID = your-project-id
GOOGLE_APPLICATION_CREDENTIALS = <full-service-account-json>
```

**To check:**
1. Go to Vercel Dashboard
2. Your Project → Settings → Environment Variables
3. Verify both variables exist
4. If missing, add them and redeploy

---

## 🧪 **TEST PLAN: AI QUALITY**

### **Test 1: Basic Image Generation**

**Prompt:**
```
"Luxury sports watch on athlete's wrist during golden hour workout"
```

**Mode:** Sport

**Expected Output:**
- High-energy athletic vibe
- Golden hour lighting
- Sweat droplets visible
- Motion blur background
- Professional commercial quality

**Quality Metrics:**
- ✅ Prompt adherence (does it match description?)
- ✅ Mode accuracy (does it feel "Sport"?)
- ✅ Professional grade (would you use this in an ad?)
- ✅ Detail quality (sharp, high-res?)

---

### **Test 2: Mode Comparison**

Use the **SAME prompt** across all 4 modes:

**Prompt:**
```
"Premium skincare bottle on marble surface with natural light"
```

**Test Each Mode:**

1. **Sport Mode**
   - Expected: High energy, athletic shadows, dynamic
   
2. **Ethereal Mode**
   - Expected: Soft, calm, pastel gradients, serene
   
3. **Clay Mode**
   - Expected: Playful, ceramic texture, tilt-shift
   
4. **Organic Mode**
   - Expected: Luxurious, food-grade quality, flat lay

**Quality Check:**
- ✅ Each mode produces DIFFERENT aesthetics?
- ✅ Mode characteristics are visible?
- ✅ All outputs are high quality?

---

### **Test 3: Complex Prompt**

**Prompt:**
```
"High-end coffee machine in modern kitchen, morning sunlight streaming through window, steam rising from fresh espresso, minimalist Scandinavian design, award-winning product photography"
```

**Mode:** Organic

**Quality Metrics:**
- ✅ Handles complex multi-element prompt?
- ✅ All details present (steam, sunlight, design)?
- ✅ Composition is professional?
- ✅ Lighting is realistic?

---

### **Test 4: Video Generation (10 Credits)**

**Prompt:**
```
"Cinematic reveal of luxury perfume bottle, camera slowly rotating around product, dramatic lighting, elegant and sophisticated"
```

**Mode:** Ethereal  
**Output Type:** Cinematic Video

**Quality Metrics:**
- ✅ Smooth camera movement?
- ✅ Cinematic quality (not choppy)?
- ✅ Lighting is dramatic?
- ✅ Worth 10 credits vs 1 image?

---

## 📊 **EVALUATION CRITERIA**

### **Image Quality (1-10 Scale)**

| Criteria | Weight | Target |
|----------|--------|--------|
| **Prompt Adherence** | 25% | 8+ |
| **Mode Accuracy** | 20% | 8+ |
| **Professional Grade** | 25% | 9+ |
| **Detail/Sharpness** | 15% | 8+ |
| **Composition** | 15% | 8+ |

**Overall Target:** 8.5/10 average

---

### **Mode Differentiation**

Test if modes produce visibly different aesthetics:

```
Same Prompt → 4 Modes → Should look DIFFERENT

Sport:     High energy, athletic, dynamic
Ethereal:  Calm, serene, soft pastels
Clay:      Playful, ceramic, tilt-shift
Organic:   Luxurious, food-grade, flat lay
```

**Pass Criteria:** 
- ✅ Can identify mode from image alone
- ✅ Mode tokens are clearly applied

---

## 🐛 **COMMON ISSUES & FIXES**

### **Issue 1: "Server configuration error"**
```
Error: Google Cloud project not configured
```

**Fix:**
1. Check `GOOGLE_CLOUD_PROJECT_ID` in Vercel
2. Verify it matches your Google Cloud project
3. Redeploy

---

### **Issue 2: "Authentication failed"**
```
Error: Could not authenticate with Vertex AI
```

**Fix:**
1. Check `GOOGLE_APPLICATION_CREDENTIALS` is complete JSON
2. Verify service account has `roles/aiplatform.user`
3. Check Vertex AI API is enabled:
   ```bash
   gcloud services enable aiplatform.googleapis.com
   ```

---

### **Issue 3: "Billing not enabled"**
```
Error: Project billing must be enabled
```

**Fix:**
1. Go to Google Cloud Console
2. Billing → Link billing account
3. Enable billing for your project

---

### **Issue 4: Low Quality Images**

**Possible Causes:**
- Prompt too vague
- Mode not matching content
- Gemini analysis not detailed enough

**Fix:**
- Use more descriptive prompts
- Test different modes
- Check Lane 1 output in console logs

---

## 📝 **TESTING CHECKLIST**

### **Functionality Tests**
- [ ] Lane 1 (Gemini) returns enhanced prompt
- [ ] Lane 2 (Imagen) generates image
- [ ] Image displays in ResultPanel
- [ ] Download works
- [ ] Credits deduct correctly
- [ ] Admin mode bypasses credits
- [ ] Video generation works (if testing)

### **Quality Tests**
- [ ] Images are high resolution
- [ ] Prompt adherence is strong
- [ ] Mode characteristics are visible
- [ ] Professional commercial quality
- [ ] Each mode produces different aesthetics
- [ ] Complex prompts work well

### **Performance Tests**
- [ ] Lane 1 completes in < 5 seconds
- [ ] Lane 2 (image) completes in < 15 seconds
- [ ] Lane 2 (video) completes in < 60 seconds
- [ ] No timeouts or crashes

---

## 💰 **COST TRACKING**

Monitor your Google Cloud billing:

```
Lane 1 (Gemini):  $0.00 per analysis
Lane 2 (Imagen):  $0.04 per image
Lane 2 (Veo):     $0.30 per video
```

**Budget for Testing:**
- 100 images = $4
- 10 videos = $3
- **Total:** ~$7 for comprehensive testing

**Your $300 free credits:** Enough for 7,500 images!

---

## 🎯 **RECOMMENDED TEST SEQUENCE**

### **Phase 1: Smoke Test (5 minutes)**
1. Generate 1 image in Sport mode
2. Verify it works end-to-end
3. Check console logs for errors

### **Phase 2: Mode Testing (20 minutes)**
1. Same prompt across all 4 modes
2. Compare visual differences
3. Evaluate mode accuracy

### **Phase 3: Quality Testing (30 minutes)**
1. Test 10 different prompts
2. Mix of simple and complex
3. Evaluate overall quality

### **Phase 4: Video Testing (15 minutes)**
1. Generate 2-3 videos
2. Evaluate cinematic quality
3. Compare value vs images

---

## 📊 **REPORT TEMPLATE**

After testing, document your findings:

```markdown
## AI Quality Test Results

**Date:** [Date]
**Total Tests:** [Number]
**Total Cost:** $[Amount]

### Image Quality
- Average Score: [X]/10
- Prompt Adherence: [X]/10
- Mode Accuracy: [X]/10
- Professional Grade: [X]/10

### Mode Differentiation
- Sport: [Pass/Fail]
- Ethereal: [Pass/Fail]
- Clay: [Pass/Fail]
- Organic: [Pass/Fail]

### Issues Found
1. [Issue description]
2. [Issue description]

### Recommendations
1. [Recommendation]
2. [Recommendation]

### Decision
[ ] Ready for production
[ ] Needs improvements
[ ] Major issues found
```

---

## ✅ **NEXT STEPS AFTER TESTING**

### **If Quality is Good (8+/10):**
1. ✅ Add Firebase for real credits
2. ✅ Implement payment (Stripe)
3. ✅ Launch to beta users
4. ✅ Collect feedback

### **If Quality Needs Work (6-8/10):**
1. ⚠️ Refine mode tokens in `prompt-engine.ts`
2. ⚠️ Improve Gemini system prompt
3. ⚠️ Test more prompt variations
4. ⚠️ Adjust Imagen parameters

### **If Quality is Poor (<6/10):**
1. ❌ Review Gemini analysis output
2. ❌ Check if mode tokens are being applied
3. ❌ Verify Imagen API is correct version
4. ❌ Consider alternative AI models

---

## 🎉 **YOU'RE READY TO TEST!**

**Your Vercel deployment will auto-update in ~2 minutes.**

**Then:**
1. Go to your Vercel URL
2. Click "Admin Login" → Enter `velvet2025`
3. Upload a product image
4. Enter a descriptive prompt
5. Select a mode
6. Click "Generate Image (1 Credit)"
7. Wait for AI magic ✨
8. Evaluate the quality!

---

**Admin Password:** `velvet2025` (unlimited testing)

**Good luck testing! Report back with quality scores!** 🚀

