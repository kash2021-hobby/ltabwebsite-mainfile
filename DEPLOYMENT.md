# BlueAnt DigiTech - Deployment Guide

## Project Overview
- **Total Files**: 14 HTML pages + assets
- **Project Size**: 472KB
- **Type**: Static website (pre-built, no compilation needed)
- **Status**: Ready to deploy immediately

## Quick Deploy Options

### Option 1: Netlify (Recommended - Easiest)

**Method A: Drag & Drop (No account needed initially)**
1. Go to https://app.netlify.com/drop
2. Drag the entire project folder into the deployment zone
3. Site goes live in ~30 seconds
4. You'll get a random URL like: `random-name-123.netlify.app`

**Method B: With Account (Better for management)**
1. Sign up at https://netlify.com
2. Click "Add new site" → "Deploy manually"
3. Drag the project folder
4. Site deploys immediately
5. Can customize domain and settings

**Configuration**: `netlify.toml` is already created

### Option 2: Vercel

1. Go to https://vercel.com and sign up
2. Click "Add New Project"
3. Select "Deploy from folder" or connect Git repo
4. Upload the project folder
5. Click "Deploy"
6. Live in ~1 minute at `project-name.vercel.app`

**Configuration**: `vercel.json` is already created

### Option 3: GitHub Pages (Free)

1. Create GitHub account at https://github.com
2. Create new repository named `blueant-digitech`
3. Upload all files (except .env - it's gitignored)
4. Go to Settings → Pages
5. Select branch (main/master) → Save
6. Site live at `username.github.io/blueant-digitech`

### Option 4: Cloudflare Pages

1. Sign up at https://pages.cloudflare.com
2. Click "Create a project"
3. Upload files or connect Git
4. Deploy settings:
   - Build command: (leave empty)
   - Build output directory: `.`
5. Deploy → Live in ~1 minute

## Files Structure

```
/
├── index.html (Homepage)
├── ai-gallery.html (AI Gallery with React)
├── create-graphics.html (Graphics tool page)
├── about/
│   └── index.html
├── case-studies/
│   └── index.html
├── contact/
│   └── index.html
├── pricing/
│   └── index.html
├── services/
│   ├── index.html
│   ├── ai-videos.html
│   ├── ai-websites.html
│   ├── ai-ops.html
│   └── social-automation.html
├── legal/
│   ├── privacy.html
│   └── terms.html
└── assets/
    ├── main-BrsOD2T7.js (Main JavaScript)
    ├── main-CEw2Pi_r.css (Main styles)
    ├── aiGallery-Se1Sy0-m.js (AI Gallery React app)
    ├── aiGallery-C6G_3qQV.css (Gallery styles)
    └── [image files] (Note: Currently placeholders)
```

## Known Issues (Non-blocking)

### Images
All image files in `/assets/` are placeholder files (20 bytes each):
- `ltab-logo-C3pUoJ4x.jpg` - Logo
- `home page hero section-CprcNffS.webp` - Hero image
- `ai avatar-DA4mg1qu.webp` - Service image
- `ai powered website-C5wZ0Cbg.webp` - Service image
- `ai software-D1r4Bonc.webp` - Service image
- `social media automation-D3ZDxwwl.webp` - Service image
- Brand logos (TVS, TATA, German Motors, Yamaha)

**Impact**: Images will show as broken/missing on the live site, but functionality works perfectly.

**Fix Later**: Replace these files with actual images without redeploying.

### Supabase Configuration
The `.env` file contains expired Supabase credentials. This affects:
- AI Gallery functionality (needs database connection)
- Any future database features

**Impact**: AI Gallery won't load data from database.

**Fix Later**: Update environment variables in hosting platform dashboard.

## Post-Deployment Steps

### 1. Custom Domain (Optional)
**On Netlify:**
- Go to Site settings → Domain management
- Click "Add custom domain"
- Follow DNS configuration instructions

**On Vercel:**
- Go to Project settings → Domains
- Add your domain
- Update DNS records as instructed

### 2. SSL Certificate
- Automatically enabled on all platforms
- Takes 1-5 minutes to provision
- Use HTTPS URLs only after SSL is active

### 3. Environment Variables (For AI Gallery)
When you have valid Supabase credentials:

**On Netlify:**
- Site settings → Build & deploy → Environment
- Add variables:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

**On Vercel:**
- Project settings → Environment Variables
- Add same variables

**Note**: Static sites don't rebuild automatically. You'll need to redeploy after adding env variables.

### 4. Analytics Verification
- Google Tag Manager ID: `GTM-NC6VZM7X`
- Verify tracking works in Google Analytics
- Check real-time reports after deployment

## Testing Checklist

After deployment, test:
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Mobile menu opens/closes
- [ ] Contact form submits (check validation)
- [ ] WhatsApp button links correctly (+91 6000683808)
- [ ] All service pages load
- [ ] Footer links work
- [ ] Responsive design on mobile/tablet
- [ ] Google Tag Manager fires events

## Support Contact

**BlueAnt DigiTech**
- Email: contactus@blueantdigitech.com
- Phone: +91 6000683808
- Location: Guwahati, Assam

## Deployment Timestamp
Created: October 31, 2025

---

**Quick Start**: Use Netlify drag-and-drop at https://app.netlify.com/drop for instant deployment!
