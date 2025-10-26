# Setup Guide

This guide will help you complete the setup of your QA or the Highway conference website.

## Prerequisites

- ✅ Node.js 18+ installed
- ✅ Git repository created
- ✅ GitHub account

## Step 1: Sessionize Setup

1. Log in to your Sessionize account at https://sessionize.com
2. Navigate to your event dashboard
3. Go to "API / Embed" section
4. Create a new API endpoint (JSON format)
5. Enable the data you want to expose (speakers, sessions, etc.)
6. Copy your Event ID from the API URL
   - Example: `https://sessionize.com/api/v2/YOUR_EVENT_ID/view/All`
   - The Event ID is the part between `/v2/` and `/view/`

## Step 2: GitHub Repository Setup

### Create and Push Repository

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: QA or the Highway website"

# Add remote (replace with your repository URL)
git remote add origin https://github.com/YOUR_USERNAME/qaorthehwy.git

# Push to main branch
git push -u origin main
```

### Configure GitHub Secrets

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secret:
   - Name: `SESSIONIZE_EVENT_ID`
   - Value: Your Sessionize Event ID from Step 1

### Enable GitHub Pages

1. Go to your repository **Settings** → **Pages**
2. Under "Build and deployment":
   - Source: Select **GitHub Actions**
3. Save the settings

## Step 3: Configure Custom Domain (Optional)

If you want to use qaorthehwy.com:

### DNS Configuration

1. Log in to your domain registrar (where you bought qaorthehwy.com)
2. Add the following DNS records:

For apex domain (qaorthehwy.com):
```
Type: A
Name: @
Value: 185.199.108.153
```
```
Type: A
Name: @
Value: 185.199.109.153
```
```
Type: A
Name: @
Value: 185.199.110.153
```
```
Type: A
Name: @
Value: 185.199.111.153
```

For www subdomain:
```
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
```

### GitHub Pages Custom Domain

1. Go to repository **Settings** → **Pages**
2. Under "Custom domain", enter: `www.qaorthehwy.com`
3. Click **Save**
4. Wait for DNS check to complete (can take a few minutes)
5. Enable "Enforce HTTPS" once DNS is verified

## Step 4: Customize Content

### Update Conference Information

Edit [src/pages/index.astro](src/pages/index.astro):

```typescript
const conferenceData = {
  date: 'June 15-16, 2026',  // Update with actual dates
  location: 'Columbus, OH',
  description: 'Your updated conference description',
};
```

### Update Ticket Information

Edit the `ticketTiers` array in [src/pages/index.astro](src/pages/index.astro):

```typescript
const ticketTiers = [
  {
    name: 'Early Bird',
    price: '$299',
    available: true,
    features: [
      'Access to all talks and sessions',
      // Add or modify features
    ],
  },
];
```

### Update Links

Edit [src/pages/index.astro](src/pages/index.astro) to update:
- Slack invite link
- Feedback form link
- Any other external links

## Step 5: Test Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Visit http://localhost:4321
```

## Step 6: Deploy

```bash
# Commit your changes
git add .
git commit -m "Update conference information"

# Push to GitHub
git push

# GitHub Actions will automatically:
# 1. Fetch Sessionize data
# 2. Build the site
# 3. Deploy to GitHub Pages
```

## Monitoring

### Check GitHub Actions

1. Go to your repository on GitHub
2. Click the **Actions** tab
3. Monitor the workflow runs:
   - **Deploy to GitHub Pages** - Builds and deploys your site
   - **Fetch Sessionize Data** - Updates speaker/session data

### View Your Site

- GitHub Pages URL: `https://YOUR_USERNAME.github.io/qaorthehwy/`
- Custom Domain: `https://www.qaorthehwy.com` (after DNS propagation)

## Maintenance

### Updating Sessionize Data

The GitHub Action automatically fetches new Sessionize data:
- Daily at 2 AM UTC
- On every push to main
- Manually via GitHub Actions tab → "Fetch Sessionize Data" → "Run workflow"

### Making Changes

1. Make changes locally
2. Test with `npm run dev`
3. Commit and push to main
4. GitHub Actions will automatically deploy

## Troubleshooting

### Build Fails

- Check GitHub Actions logs
- Run `npm run build` locally to see errors
- Ensure all dependencies are installed

### Sessionize Data Not Updating

- Verify `SESSIONIZE_EVENT_ID` secret is set correctly
- Check that API endpoint is enabled in Sessionize
- Look at workflow logs in GitHub Actions

### Custom Domain Not Working

- Wait up to 24-48 hours for DNS propagation
- Verify DNS records with `dig www.qaorthehwy.com`
- Check GitHub Pages settings for domain verification status

## Next Steps

1. ✅ Complete all setup steps above
2. ✅ Test the site locally
3. ✅ Push to GitHub and verify deployment
4. ✅ Add speakers and sessions in Sessionize
5. ✅ Customize styling and content
6. ✅ Share your conference website!

## Support

If you run into issues:
- Check the [Astro documentation](https://docs.astro.build)
- Review [GitHub Pages docs](https://docs.github.com/en/pages)
- Check [Sessionize API docs](https://sessionize.com/playbook/api)
