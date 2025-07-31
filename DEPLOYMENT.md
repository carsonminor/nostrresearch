# NostrResearch Deployment Guide

This guide covers all deployment options for the NostrResearch platform.

## 🚀 Quick Deploy Options

### 1. Netlify (Recommended - Easiest)

**One-Click Deploy:**
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/nostrresearch)

**Manual Deploy:**
1. Push code to GitHub
2. Connect GitHub to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy automatically on every commit

**Custom Domain:**
- Add your domain in Netlify settings
- Update DNS to point to Netlify
- SSL certificate is automatic

### 2. Vercel (Great Performance)

**One-Click Deploy:**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/nostrresearch)

**Manual Deploy:**
1. Push code to GitHub
2. Import project to Vercel
3. Auto-detects Vite configuration
4. Deploys automatically

### 3. GitHub Pages (Free)

**Setup:**
1. Push code to GitHub
2. Go to repository Settings → Pages
3. Select "GitHub Actions" as source
4. The workflow in `.github/workflows/deploy-gh-pages.yml` will handle deployment
5. Site will be available at `https://yourusername.github.io/nostrresearch`

### 4. Nostr-Native Deployment (Decentralized)

**Deploy to Nostr Protocol:**
```bash
npm run deploy
```

This uses `nostr-deploy-cli` to publish your site directly to Nostr relays, making it truly decentralized and censorship-resistant.

## 🌐 Production Deployment Options

### Option A: Traditional Web Hosting

**Pros:**
- ✅ Easy to access (regular URLs)
- ✅ Better SEO and discoverability
- ✅ Familiar to users
- ✅ Fast global CDN
- ✅ Custom domains

**Cons:**
- ❌ Centralized hosting
- ❌ Can be censored/taken down
- ❌ Requires traditional infrastructure

**Best For:** Maximum user adoption and accessibility

### Option B: Nostr-Native Hosting

**Pros:**
- ✅ Truly decentralized
- ✅ Censorship-resistant
- ✅ Aligned with Nostr philosophy
- ✅ No hosting costs
- ✅ Community-owned infrastructure

**Cons:**
- ❌ Requires Nostr-compatible browser/client
- ❌ Less discoverable
- ❌ Newer technology
- ❌ Limited SEO

**Best For:** Nostr-native users and maximum decentralization

### Option C: Hybrid Deployment (Recommended)

Deploy to **both** traditional web and Nostr:

1. **Primary Site:** Netlify/Vercel for broad accessibility
2. **Nostr Mirror:** Nostr deployment for decentralization
3. **Cross-Promotion:** Link between both versions

## 🔧 Self-Hosting Options

### Docker Deployment

**Single Container:**
```bash
docker build -t nostrresearch .
docker run -p 3000:80 nostrresearch
```

**Docker Compose:**
```bash
docker-compose up -d
```

### VPS Deployment

**Requirements:**
- Ubuntu 20.04+ or similar
- 1GB RAM minimum
- Node.js 18+
- Nginx (optional, for reverse proxy)

**Steps:**
```bash
# Clone repository
git clone https://github.com/yourusername/nostrresearch.git
cd nostrresearch

# Install dependencies and build
npm install
npm run build

# Serve with nginx or any static file server
sudo cp -r dist/* /var/www/html/
```

## 🌍 Domain and DNS Setup

### Custom Domain Configuration

**For Netlify:**
1. Add domain in Netlify dashboard
2. Update DNS records:
   ```
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   
   Type: A
   Name: @
   Value: 75.2.60.5
   ```

**For Vercel:**
1. Add domain in Vercel dashboard
2. Update DNS records as provided by Vercel

**For Self-Hosting:**
1. Point A record to your server IP
2. Configure SSL with Let's Encrypt:
   ```bash
   sudo certbot --nginx -d nostrresearch.com
   ```

## 📊 Monitoring and Analytics

### Performance Monitoring
- **Vercel Analytics:** Built-in performance metrics
- **Netlify Analytics:** Traffic and performance data
- **Google Analytics:** User behavior tracking
- **Plausible:** Privacy-friendly analytics

### Uptime Monitoring
- **UptimeRobot:** Free uptime monitoring
- **Pingdom:** Advanced monitoring features
- **StatusPage:** Public status page

## 🔒 Security Considerations

### Content Security Policy
The app includes a strict CSP in `index.html`. Update as needed for your deployment.

### HTTPS
- **Netlify/Vercel:** Automatic HTTPS
- **Self-hosted:** Use Let's Encrypt
- **Cloudflare:** Additional security layer

### Environment Variables
For production deployments, consider:
- Default relay configuration
- Analytics tracking IDs
- Error reporting services

## 🚀 Recommended Deployment Strategy

**Phase 1: MVP Launch**
1. Deploy to **Netlify** for immediate accessibility
2. Use domain like `nostrresearch.com`
3. Focus on user acquisition and feedback

**Phase 2: Decentralization**
1. Add **Nostr-native deployment**
2. Promote both versions to users
3. Build Nostr-native user base

**Phase 3: Ecosystem Growth**
1. Encourage other clients to support research features
2. Build specialized research relays
3. Partner with academic institutions

## 📈 Launch Checklist

**Pre-Launch:**
- [ ] All tests passing
- [ ] Performance optimized
- [ ] SEO metadata complete
- [ ] Analytics configured
- [ ] Error monitoring setup
- [ ] Custom domain configured
- [ ] SSL certificate active

**Launch Day:**
- [ ] Deploy to production
- [ ] Test all functionality
- [ ] Monitor error rates
- [ ] Share on social media
- [ ] Post to Nostr
- [ ] Submit to directories

**Post-Launch:**
- [ ] Monitor user feedback
- [ ] Track key metrics
- [ ] Plan feature updates
- [ ] Build community
- [ ] Document API for developers

## 🤝 Community Deployment

Consider these community-driven deployment options:

**Nostr Community Hosting:**
- Partner with existing Nostr infrastructure providers
- Community-funded hosting
- Distributed hosting across multiple providers

**Academic Partnerships:**
- University hosting programs
- Research institution partnerships
- Academic network deployment

**Open Source Hosting:**
- GitHub Sponsors for hosting costs
- Community contributions for infrastructure
- Volunteer-run instances

Choose the deployment strategy that best aligns with your goals for decentralization, accessibility, and community building!