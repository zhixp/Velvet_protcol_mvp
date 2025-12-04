# VELVET PROTOCOL

> **The Category King** - AI High-End Commercial Photography & Video Suite

## 🎯 Mission

Generate "Category King" static product photography using Google Vertex AI (Imagen-3.0) with an optional cinematic video upsell (Veo 3.1).

## 🛠 Tech Stack

- **Frontend:** Next.js 14 (App Router), Tailwind CSS, Framer Motion, Lucide React
- **Backend:** Node.js (Next.js API Routes)
- **AI:** Google Cloud Vertex AI (`@google-cloud/vertexai`)
- **Auth:** Firebase Auth (Anonymous → Google)
- **Database:** Firebase Firestore

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env.local` file in the root directory:

```bash
# Google Cloud Vertex AI
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account.json

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 💰 Hybrid Credit Economy

### Lane 1 (The Brain - Free)
- **Model:** `gemini-1.5-pro` (AI Studio Free Tier)
- **Task:** Analyze input, determine vibe, write "Director's Script"
- **Cost:** $0.00

### Lane 2 (The Product - Paid)
- **Image:** `imagen-3.0-generate-001` (1 Credit)
- **Video:** `veo-3.1` (10 Credits)

## 🎨 The Four Velvet Modes

### 1. VELVET SPORT
High energy, athletic, dynamic movement
- **Lighting:** Golden hour flair, deep athletic shadows
- **Texture:** Micro-water droplets, sweat-drenched lycra
- **Camera:** High shutter speed (1/1000s), motion blur background

### 2. VELVET ETHEREAL
Wellness, calm, natural, serene
- **Lighting:** Diffused atmospheric light, soft pastel gradients
- **Texture:** Translucent surfaces, negative space, organic flow
- **Camera:** Wide angle, analog film grain

### 3. VELVET CLAY
SaaS, tech, playful, minimalist
- **Lighting:** Softbox studio lighting, gentle rim light
- **Texture:** Handcrafted ceramic, visible fingerprint marks
- **Camera:** Macro lens, shallow depth of field (tilt-shift)

### 4. VELVET ORGANIC
Food, product, luxurious, gourmet
- **Lighting:** Frontal soft light, minimal shadows, high-key editorial
- **Texture:** Dense piling, viscous liquid flow, matte pastel
- **Camera:** Top-down (flat lay) or 45-degree macro

## 📁 Project Structure

```
velvet-ai/
├── app/
│   ├── globals.css          # Velvet Luxury theme
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing page
├── components/
│   ├── HeroSection.tsx       # Drop zone with glassmorphism
│   ├── ModeSelector.tsx      # 4-mode toggle
│   └── PortfolioGrid.tsx     # Masonry portfolio grid
├── lib/
│   ├── prompt-engine.ts      # Lane 1 Gemini logic
│   └── utils.ts              # Utility functions
└── Readme.txt                # Project constraints (DO NOT DELETE)
```

## 🎨 Design System

### Colors
- **Background:** `#050505` (Velvet Black)
- **Secondary:** `#121212` (Charcoal)
- **Accent:** `#C5A059` (Muted Gold)

### Components
- **Glassmorphism:** `backdrop-blur-glass`, thin 1px borders
- **No heavy shadows:** Subtle glows only
- **Animations:** Framer Motion with easing `[0.22, 1, 0.36, 1]`

## 🔒 Security

- ✅ No hardcoded API keys (use `process.env`)
- ✅ Firebase Auth for user management
- ✅ Firestore security rules (to be configured)

## 📝 Development Log

See `Readme.txt` for full development history.

## 🚢 Deployment

### Docker (Google Cloud Run)

```bash
# Build
docker build -t velvet-protocol .

# Run locally
docker run -p 3000:3000 velvet-protocol

# Deploy to Cloud Run
gcloud run deploy velvet-protocol --source .
```

## 🤝 Contributing

This is a production-grade codebase. No "AI slop" allowed.

- Write complete, functional code
- Use standard npm packages only
- Follow the Velvet design system
- Update development log in `Readme.txt`

---

**Built by The Lead Engineer**  
Powered by Google Cloud Vertex AI

