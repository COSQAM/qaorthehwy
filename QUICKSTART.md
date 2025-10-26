# Quick Start Checklist

## Immediate Next Steps

### 1. Test Locally ✓
```bash
npm run dev
```
Open http://localhost:4321 to see your site

### 2. Get Your Sessionize Event ID
- [ ] Go to https://sessionize.com
- [ ] Navigate to your event
- [ ] Go to "API / Embed" section
- [ ] Create a JSON endpoint
- [ ] Copy the Event ID from the URL

### 3. Create GitHub Repository
```bash
git add .
git commit -m "Initial commit: Conference website"
git remote add origin https://github.com/YOUR_USERNAME/qaorthehwy.git
git push -u origin main
```

### 4. Configure GitHub
- [ ] Add `SESSIONIZE_EVENT_ID` secret in repository settings
- [ ] Enable GitHub Pages (Settings → Pages → Source: GitHub Actions)

### 5. Customize Content
Edit `src/pages/index.astro`:
- [ ] Update conference date
- [ ] Update location
- [ ] Update description
- [ ] Update ticket prices
- [ ] Update Slack link
- [ ] Update feedback form link

### 6. Push Changes
```bash
git add .
git commit -m "Customize conference information"
git push
```

## Your Site Will Be Live At:
- **GitHub Pages**: `https://YOUR_USERNAME.github.io/qaorthehwy/`
- **Custom Domain** (after DNS setup): `https://www.qaorthehwy.com`

## Need More Help?
See [SETUP.md](SETUP.md) for detailed instructions.
