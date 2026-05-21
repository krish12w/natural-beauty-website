# Natural Beauty Clinic & Academy
## Complete Setup & Deployment Guide
### For Beginners — No Coding Knowledge Required

---

## 📋 WHAT YOU HAVE

Your website includes:
- ✅ Full professional website (index.html)
- ✅ Admin panel at /admin (Decap CMS)
- ✅ All content collections (services, courses, gallery, blog, etc.)
- ✅ WhatsApp floating button
- ✅ Booking & contact forms
- ✅ Dark/light mode
- ✅ Mobile responsive design
- ✅ SEO optimized
- ✅ File download system

---

## 🚀 STEP 1: SET UP GITHUB

### A. Create a GitHub Account
1. Go to https://github.com
2. Click "Sign up" → create free account
3. Verify your email

### B. Create a New Repository
1. Click the **"+"** button (top right) → "New repository"
2. Repository name: `natural-beauty-website`
3. Set to **Public** (required for free Netlify)
4. Click **"Create repository"**

### C. Upload Your Files
1. Click **"uploading an existing file"** link on the new repo page
2. Drag and drop your entire project folder
3. Scroll down → click **"Commit changes"**
4. ✅ Your files are now on GitHub!

---

## 🌐 STEP 2: DEPLOY ON NETLIFY

### A. Create Netlify Account
1. Go to https://netlify.com
2. Click "Sign up" → choose **"Sign up with GitHub"**
3. Authorize Netlify to access your GitHub

### B. Deploy Your Site
1. In Netlify dashboard → click **"Add new site"**
2. Choose **"Import an existing project"**
3. Select **"GitHub"**
4. Choose your `natural-beauty-website` repository
5. Build settings:
   - Build command: leave empty
   - Publish directory: `.` (just a dot)
6. Click **"Deploy site"**
7. Wait 1–2 minutes → your site is LIVE! 🎉

### C. Set Your Domain Name
1. In Netlify → Site settings → Domain management
2. Either use free Netlify subdomain (yourname.netlify.app)
3. Or add your custom domain if you have one

### D. Update Your URLs
After deployment, update these in your files:
- In `robots.txt`: Replace `YOUR-SITE.netlify.app` with your real URL
- In `sitemap.xml`: Replace `YOUR-SITE.netlify.app` with your real URL
- In `admin/config.yml`: Replace `YOUR-SITE.netlify.app` with your real URL

---

## 🔐 STEP 3: SET UP ADMIN LOGIN

This is the most important step — it gives you your admin panel!

### A. Enable Netlify Identity
1. In Netlify dashboard → your site → **"Integrations"** tab
2. Find **"Identity"** → click **"Enable Identity"**
3. Under "Registration" → choose **"Invite only"** (for security)
4. Click Save

### B. Enable Git Gateway
1. Still in Identity settings
2. Scroll to **"Services"** section
3. Click **"Enable Git Gateway"**
4. ✅ This lets the admin panel save to GitHub

### C. Create Your Admin Account
1. In Identity → click **"Invite users"**
2. Enter YOUR email address
3. Click "Send invite"
4. Check your email → click the invitation link
5. Set your password
6. ✅ You now have admin access!

### D. Test Your Admin Panel
1. Go to: `https://your-site.netlify.app/admin`
2. Click "Login with Netlify Identity"
3. Enter your email and password
4. ✅ Welcome to your Admin Dashboard!

---

## ✏️ STEP 4: HOW TO USE YOUR ADMIN PANEL

### Logging In
- Go to: `https://your-site.netlify.app/admin`
- Login with your email and password

### Adding a New Service
1. In admin → click "💅 Services"
2. Click "New Services" button
3. Fill in: Service Name, Category, Price, Description
4. Upload a photo (optional)
5. Click "Publish" → website updates automatically!

### Adding a Blog Post
1. Admin → "📝 Blog & News"
2. Click "New Blog & News"
3. Write your title and content using the rich text editor
4. Add a featured image
5. Click "Publish"

### Uploading Photos to Gallery
1. Admin → "🖼️ Gallery"
2. Click "New Gallery"
3. Click "Choose image" → upload your photo
4. Add caption and category
5. Click "Publish"

### Uploading Files (PDFs, etc.)
1. Admin → "📁 Downloads & Files"
2. Click "New Downloads & Files"
3. Upload your PDF/DOCX/Excel file
4. Fill in title, category, description
5. Click "Publish"

### Editing Homepage Text
1. Admin → "🏠 Homepage Settings" → "Hero Section"
2. Edit heading, sub-heading, announcement
3. Click "Publish"

### Adding Team Members
1. Admin → "👩‍🏫 Team"
2. Click "New Team"
3. Add name, photo, role, skills
4. Click "Publish"

---

## 📸 STEP 5: ADD YOUR PHOTOS

### Hero Image (most important!)
1. Admin → Homepage Settings → Hero Section
2. Click "Hero Image" → upload a beautiful photo of your clinic
3. Recommended size: 800×1000 pixels
4. Click Publish

### About Image
1. Admin → Homepage Settings → About Section
2. Upload a photo of you or your clinic interior

### Service Photos
Add photos to each service:
1. Admin → Services → click any service
2. Find "Image" field → upload photo
3. Recommended: 600×450 pixels

### Gallery Photos
1. Admin → Gallery → New Gallery
2. Upload before/after photos, work samples
3. Add category (Hair, Makeup, Bridal, etc.)

---

## 💬 STEP 6: CONNECT WHATSAPP

Your WhatsApp button is already set up with number: **9779843805588**

To change the number:
1. Admin → Homepage Settings → Contact & Business Info
2. Update "WhatsApp" field with full number (include country code: 977...)
3. Publish

---

## 📧 STEP 7: RECEIVE BOOKING EMAILS

When clients fill your booking form, you'll receive an email notification.

### Set Up Email Notifications
1. Netlify dashboard → your site → **"Forms"**
2. Click on "booking" form
3. Click **"Form notifications"**
4. Add your email address
5. ✅ You'll now get an email for every booking!

---

## 🗺️ STEP 8: UPDATE GOOGLE MAPS

1. Go to https://google.com/maps
2. Search for: "New Baneshwor, Kathmandu"
3. Click "Share" → "Embed a map" → Copy the iframe code
4. In Admin → Homepage Settings → Contact & Business Info
5. Paste the embed URL in "Google Maps Embed" field
6. Publish

---

## 📱 STEP 9: CONNECT SOCIAL MEDIA

1. Admin → Homepage Settings → Contact & Business Info
2. Add your Facebook page URL
3. Add your Instagram profile URL
4. Publish
5. Footer social buttons will link to your pages

---

## 🔄 HOW WEBSITE UPDATES WORK

When you publish something in Admin:
1. Admin saves to GitHub automatically
2. Netlify detects the change
3. Website redeploys in 1–2 minutes
4. Your changes are live! ✅

---

## 📁 FILE STRUCTURE REFERENCE

```
natural-beauty-website/
├── index.html              ← Main website
├── netlify.toml            ← Netlify config
├── robots.txt              ← SEO robots file
├── sitemap.xml             ← SEO sitemap
├── admin/
│   ├── index.html          ← Admin panel page
│   └── config.yml          ← CMS configuration
├── assets/
│   ├── css/style.css       ← All website styles
│   ├── js/main.js          ← All website scripts
│   ├── images/             ← Static images
│   └── uploads/            ← Your uploaded files
├── _data/
│   ├── hero.json           ← Hero section content
│   ├── about.json          ← About section content
│   ├── contact.json        ← Contact info
│   ├── services/           ← Service cards
│   ├── courses/            ← Academy courses
│   ├── team/               ← Team members
│   ├── testimonials/       ← Client reviews
│   ├── gallery/            ← Gallery items
│   ├── downloads/          ← Downloadable files
│   ├── faq/                ← FAQ items
│   ├── announcements/      ← Offers & news
│   └── manifests/          ← File index lists
├── blog/
│   └── posts/              ← Blog post files
└── static/
    └── 404.html            ← Error page
```

---

## 🔒 SECURITY CHECKLIST

- ✅ Admin login protected by Netlify Identity
- ✅ Registration set to "Invite only"
- ✅ Forms have spam protection
- ✅ Security headers configured
- ✅ Admin folder blocked from search engines

### Recommended Security Practices
1. Use a strong password (12+ characters)
2. Never share your admin URL publicly
3. Only invite trusted email addresses
4. Download a copy of your _data folder monthly as backup

---

## ❓ TROUBLESHOOTING

**Admin panel shows blank page?**
→ Make sure Netlify Identity is enabled in your site settings

**"Git Gateway Error" in admin?**
→ Enable Git Gateway in Identity → Services section

**Forms not sending emails?**
→ Set up form notifications in Netlify dashboard → Forms section

**Images not showing?**
→ Upload via Admin Panel → media will go to assets/uploads/

**Website not updating after admin changes?**
→ Wait 2 minutes for Netlify to rebuild, then hard-refresh (Ctrl+Shift+R)

---

## 📞 QUICK REFERENCE

| What | Where |
|------|-------|
| Your website | https://your-site.netlify.app |
| Admin panel | https://your-site.netlify.app/admin |
| GitHub repo | https://github.com/your-username/natural-beauty-website |
| Netlify dashboard | https://app.netlify.com |
| Phone | 9843805588, 9823207031 |

---

*Natural Beauty Clinic & Academy — New Baneshwor, Kathmandu, Nepal*
