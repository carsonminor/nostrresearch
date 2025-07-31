# GitHub Deployment Guide

## 🚀 Quick Deploy to GitHub Pages

### Step 1: Create GitHub Repository

1. **Go to GitHub** and create a new repository
2. **Name it** `nostrresearch` (or your preferred name)
3. **Make it public** (required for free GitHub Pages)
4. **Don't initialize** with README (we have our own files)

### Step 2: Push Your Code

```bash
# Initialize git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit: NostrResearch platform"

# Add your GitHub repository as origin
git remote add origin https://github.com/YOUR_USERNAME/nostrresearch.git

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. **Go to your repository** on GitHub
2. **Click Settings** tab
3. **Scroll to Pages** section (left sidebar)
4. **Source**: Select "GitHub Actions"
5. **The workflow will automatically deploy** your site

### Step 4: Access Your Site

Your site will be available at:
```
https://YOUR_USERNAME.github.io/nostrresearch
```

## 🔧 Alternative: Manual Commands

If you prefer command line:

```bash
# Clone this repository
git clone https://github.com/YOUR_USERNAME/nostrresearch.git
cd nostrresearch

# Install dependencies
npm install

# Build the project
npm run build

# Test locally (optional)
npx serve dist
```

## 🌐 Custom Domain (Optional)

### Add Custom Domain to GitHub Pages:

1. **Buy a domain** (e.g., `nostrresearch.com`)
2. **In GitHub repository settings** → Pages → Custom domain
3. **Enter your domain** and save
4. **Update DNS records** at your domain provider:
   ```
   Type: CNAME
   Name: www
   Value: YOUR_USERNAME.github.io
   
   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   ```

## 📊 Monitoring Deployment

### Check Deployment Status:
1. **Go to Actions tab** in your GitHub repository
2. **View workflow runs** to see deployment progress
3. **Green checkmark** = successful deployment
4. **Red X** = deployment failed (check logs)

### Troubleshooting:
- **Build fails**: Check the Actions tab for error logs
- **Site not loading**: Wait 5-10 minutes after first deployment
- **404 errors**: Ensure GitHub Pages is enabled in settings

## 🔄 Updating Your Site

Every time you push changes to the main branch:

```bash
# Make your changes
git add .
git commit -m "Update: description of changes"
git push origin main
```

The site will automatically rebuild and deploy!

## 🎯 Next Steps After Deployment

1. **Test all functionality** on the live site
2. **Share the URL** with beta testers
3. **Update README** with your actual live URL
4. **Submit to directories** and communities
5. **Start your launch strategy**

## 🔗 Useful Links

- **GitHub Pages Documentation**: https://docs.github.com/en/pages
- **Custom Domain Setup**: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
- **GitHub Actions**: https://docs.github.com/en/actions

Your NostrResearch platform will be live and accessible to the world! 🌍