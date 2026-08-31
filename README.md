# Deploy to Vercel Guide - Wolf of BIT Mesra

This project is a high-performance Single Page Application (React 19 + TypeScript + Vite + Tailwind CSS) with zero required backend dependencies for full client operation (Local state, Web Audio API, Canvas Confetti, and CSV export all run client-side in the browser).

---

## Option 1: Deploy via GitHub (Recommended & Easiest)

1. **Push your code to GitHub**:
   - In AI Studio, click the top-right menu and choose **Export to GitHub** (or download the ZIP and push to a new GitHub repository).

2. **Import into Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in.
   - Click **"Add New..."** -> **"Project"**.
   - Select your GitHub repository.

3. **Confirm Build Settings**:
   - **Framework Preset**: `Vite` (automatically detected).
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   *(All pre-configured in `vercel.json`)*

4. **Deploy**:
   - Click **Deploy**. In under 1 minute, your app will be live with a free `*.vercel.app` domain and HTTPS!

---

## Option 2: Deploy via Vercel CLI (Instant from Terminal)

If you have downloaded or cloned the project to your computer:

```bash
# 1. Install Vercel CLI globally (if not installed)
npm i -g vercel

# 2. In project root, run:
vercel

# Follow prompts:
# ? Set up and deploy? [Y]
# ? Which scope? [Your Account]
# ? Link to existing project? [N]
# ? What's your project's name? wolf-of-bit-mesra
# ? In which directory is your code located? ./
# Vercel will auto-detect Vite and vercel.json.

# For production deployment:
vercel --prod
```

---

## Files Configured for Vercel
- `vercel.json`: Single Page Application client-side routing rewrites (`/(.*) -> /index.html`) so refreshing on any view works seamlessly.
- `package.json`: Contains standard production `build` command (`vite build`) and clean output in `dist/`.
