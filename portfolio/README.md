# 🚀 Full-Stack Deployment Guide: Render & Netlify

This guide provides step-by-step instructions to deploy the **Node.js/Express Backend** (`server/`) to **Render** as a Web Service and the **React/Vite Frontend** (`src/`) to **Netlify**.

---

## 🏗️ Architecture Overview

```
 ┌───────────────────────────────────┐             ┌───────────────────────────────────┐
 │          NETLIFY FRONTEND         │             │           RENDER BACKEND          │
 │                                   │  /api/*     │                                   │
 │   React 19 + TypeScript + Vite    │────────────►│   Node.js + Express API Server    │
 │   Published from: dist/           │  (Proxy)    │   Entrypoint: server/index.js     │
 └───────────────────────────────────┘             └───────────────────────────────────┘
```

- **Frontend (`src/`)**: Deployed on **Netlify** (Static Site Hosting with SPA routing & reverse proxy).
- **Backend Services (`server/`)**: Deployed on **Render** (Node.js Web Service for Nodemailer OTP & Groq LLM AI).

---

## 📋 Prerequisites

Before starting, ensure you have:
1. A **GitHub Repository** containing your portfolio code committed and pushed.
2. A **Render Account** ([render.com](https://render.com)).
3. A **Netlify Account** ([netlify.com](https://netlify.com)).
4. **Google App Password** (16 characters) for Nodemailer SMTP email delivery.
5. **Groq API Key** (from [console.groq.com](https://console.groq.com)) for the AI voice assistant.

---

## 🛠️ Step 1: Deploy Backend Web Service to Render

1. Log into [Render Dashboard](https://dashboard.render.com).
2. Click **New +** in the top right and select **Web Service**.
3. Connect your **GitHub Account** and select your portfolio repository.
4. Fill in the **Web Service Configuration**:
   - **Name**: `portfolio-backend` *(or a name of your choice)*
   - **Region**: Choose the region closest to your users (e.g., *Singapore*, *Oregon*)
   - **Branch**: `main`
   - **Root Directory**: Leave blank (`./`)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server/index.js` *(or `npm start`)*
   - **Instance Type**: `Free`

5. **Configure Environment Variables**:
   Scroll down to the **Environment Variables** section and add the following keys:

   | Environment Variable | Recommended / Example Value | Description |
   |---|---|---|
   | `PORT` | `3001` | Express server port |
   | `ADMIN_EMAIL` | `rangadaschakravarthy02@gmail.com` | Target email for admin notifications & OTP |
   | `SMTP_HOST` | `smtp.gmail.com` | Mail server host |
   | `SMTP_PORT` | `587` | TLS port for Gmail |
   | `SMTP_SECURE` | `false` | Set to `false` for port 587 |
   | `SMTP_USER` | `rangadaschakravarthy02@gmail.com` | Your Gmail address |
   | `SMTP_PASS` | `xxxx xxxx xxxx xxxx` | 16-character Google App Password |
   | `GROQ_API_KEY` | `gsk_...` | Groq AI SDK Key |

6. Click **Create Web Service**.
7. Wait 2–3 minutes for the build and deployment to complete.
8. **Copy your live Render Backend URL** (e.g., `https://portfolio-backend.onrender.com`).

---

## 🔗 Step 2: Update Frontend API Proxy Configuration

To prevent CORS issues and allow the Netlify frontend to communicate seamlessly with the Render backend, update the proxy URLs in your project.

### 1. Update `netlify.toml` in your project root:

Replace `YOUR-RENDER-APP-NAME` with your actual Render service name (e.g., `portfolio-backend`):

```toml
[build]
  command = "npm run build"
  publish = "dist"

# Reverse Proxy /api requests to Render Web Service
[[redirects]]
  from = "/api/*"
  to = "https://portfolio-backend.onrender.com/api/:splat"
  status = 200
  force = true

# Fallback for Single Page Application (SPA) routing
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 2. Update `public/_redirects`:

```text
/api/*  https://portfolio-backend.onrender.com/api/:splat  200!
/*      /index.html                                         200
```

### 3. Commit & Push to GitHub:

```bash
git add netlify.toml public/_redirects package.json
git commit -m "Configure Render API proxy endpoints for production"
git push origin main
```

---

## 🌐 Step 3: Deploy Frontend (`src/`) to Netlify

1. Log into [Netlify Dashboard](https://app.netlify.com).
2. Click **Add new site** → **Import an existing project**.
3. Choose **GitHub** as your Git provider and authorize access.
4. Select your portfolio repository.
5. Configure the **Build Settings**:
   - **Branch to deploy**: `main`
   - **Base directory**: Leave blank (`/`)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

6. Click **Deploy portfolio** (or **Deploy Site**).
7. Netlify will build your React application using Vite and generate a production site URL (e.g., `https://your-portfolio.netlify.app`).

---

## 🧪 Step 4: Verification & Testing

Once both services are deployed, test your live deployment:

1. **Backend Health Check**:
   Open `https://portfolio-backend.onrender.com/api/health` in your browser. You should receive:
   ```json
   { "status": "ok", "message": "Portfolio API server is running" }
   ```

2. **Frontend & Proxy Check**:
   Open `https://your-portfolio.netlify.app/api/health`. If the reverse proxy is working correctly, it will return the exact same JSON health response without CORS errors.

3. **Admin OTP Email Test**:
   - Navigate to `https://your-portfolio.netlify.app/admin`
   - Request an OTP code.
   - Verify that you receive an email from your configured SMTP address.

4. **ALAN AI Voice Assistant Test**:
   - Click the AI assistant widget on your site.
   - Send a message or ask a question to confirm Groq API responses are working.

---

## ❓ Frequently Asked Questions & Troubleshooting

### 1. Render Free Tier Cold Starts
- **Issue**: The first request (like OTP generation or AI response) takes ~30–45 seconds.
- **Cause**: Render's free tier puts web services to sleep after 15 minutes of inactivity.
- **Solution**: This is expected on the free tier. Once spun up, subsequent requests will be fast. You can use a free uptime monitoring tool (like UptimeRobot) to ping `/api/health` every 10 minutes to keep it awake.

### 2. Netlify 404 on Direct Page Refresh (e.g. `/admin`)
- **Issue**: Navigating directly to `/admin` or refreshing the page gives a Netlify 404 error.
- **Solution**: Ensure `netlify.toml` and `public/_redirects` are in place with the `/* -> /index.html 200` redirect rule.

### 3. Nodemailer SMTP Authentication Failed
- **Issue**: Server logs show `535-5.7.8 Username and Password not accepted`.
- **Solution**: 
  1. Make sure 2-Factor Authentication is enabled on your Gmail account.
  2. Generate a 16-character **App Password** under `Google Account > Security > 2-Step Verification > App Passwords`.
  3. Enter the 16-character app password into Render's `SMTP_PASS` environment variable (without spaces).

---

## 📜 License & Maintenance

Created by **Rangadas Chakravarthy**. Designed for automated deployment on Netlify & Render.
