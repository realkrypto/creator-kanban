# Deployment Guide

To make this webpage available to everybody, you need to deploy it to a hosting provider. Since this is a React (Vite) application, **Vercel** or **Netlify** are the easiest and best options.

## Option 1: Vercel (Recommended)
Vercel is the creators of Next.js and provides excellent support for Vite apps.

1.  **Push your code to GitHub**:
    - Make sure your project is committed and pushed to a GitHub repository.
2.  **Sign up/Login to Vercel**:
    - Go to [vercel.com](https://vercel.com) and sign up (you can use your GitHub account).
3.  **Import Project**:
    - Click "Add New..." -> "Project".
    - Select your GitHub repository `ugc-leads-dashboard`.
4.  **Configure**:
    - Vercel will automatically detect it's a Vite project.
    - The build settings should be pre-filled correctly:
        - **Framework Preset**: Vite
        - **Build Command**: `npm run build`
        - **Output Directory**: `dist`
5.  **Deploy**:
    - Click "Deploy".
    - Wait a minute, and you'll get a live URL (e.g., `ugc-leads-dashboard.vercel.app`) that you can share with everyone.

## Option 2: Netlify
Netlify is another great option for static sites.

1.  **Push your code to GitHub**.
2.  **Sign up/Login to Netlify**:
    - Go to [netlify.com](https://netlify.com).
3.  **Add New Site**:
    - Click "Add new site" -> "Import an existing project".
    - Connect to GitHub and select your repo.
4.  **Configure**:
    - **Build command**: `npm run build`
    - **Publish directory**: `dist`
5.  **Deploy**:
    - Click "Deploy site".

## Important Note on Data
Currently, this application uses `localStorage` to save data (Leads, Users, etc.).
- **Data is Local**: Data created by one user on their browser **will NOT** be visible to other users on their browsers.
- **Persistence**: If a user clears their cache or uses a different device, their data will be gone.
- **Sharing**: To have a shared database where everyone sees the same leads, we would need to implement a real backend (e.g., Firebase, Supabase, or a Node.js server).
