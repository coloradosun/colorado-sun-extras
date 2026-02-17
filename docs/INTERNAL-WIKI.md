# Colorado Sun Extras — Internal Documentation

**Last Updated:** January 28, 2026  
**Repository:** `coloradosun/colorado-sun-extras`  
**Live Site:** https://extras.coloradosun.com

---

## Overview

Colorado Sun Extras is a Gatsby-based static site that hosts interactive HTML data visualizations and newsletter archives for The Colorado Sun. The site is automatically deployed to GitHub Pages whenever changes are pushed to the `main` branch.

### Key Features

- **Interactive HTML Embeds**: Self-contained HTML files displayed in full-height iframes
- **MDX Content Pages**: Rich content with metadata stored in frontmatter
- **Template Variable Processing**: Automatic replacement of `%TODAY%` with publish date
- **Share URLs**: Each post has a dedicated share URL for social media
- **Category Organization**: Posts organized by category with dedicated listing pages

### Technology Stack

| Component | Technology |
|-----------|------------|
| Framework | Gatsby 5.16 |
| UI Components | React 18, React Aria Components |
| Styling | Tailwind CSS 3 |
| Content | MDX (Markdown + JSX) |
| Hosting | GitHub Pages |
| Deployment | GitHub Actions (automatic on push to main) |

---

## Repository Structure

```
colorado-sun-extras/
├── src/
│   ├── content/
│   │   └── posts/           # MDX content files (single source of truth)
│   ├── components/          # Reusable React components
│   ├── templates/           # Page templates (post, share, edit, category)
│   ├── pages/               # Static pages (index, 404)
│   └── styles/              # Global CSS
├── static/
│   ├── html-files/          # Self-contained HTML interactives
│   └── images/              # Static images (logo, share images)
├── gatsby-config.js         # Site configuration
├── gatsby-node.js           # Dynamic page generation
└── .github/
    └── workflows/
        └── deploy.yml       # GitHub Actions deployment
```

---

## Creating a New Post

### Step 1: Prepare Your HTML File

1. Ensure your HTML file is **self-contained** (all CSS/JS inline or embedded)
2. Name it descriptively, e.g., `unaffiliated_01_28_2026.html`
3. Place it in `static/html-files/`

**Template Variables (Optional):**
- `%TODAY%` — Will be replaced with the formatted publish date (e.g., "January 28, 2026")
- `%SENDER-INFO-SINGLELINE%` — Will be removed automatically

### Step 2: Create the MDX Content File

Create a new file in `src/content/posts/` with the naming convention `{slug}.mdx`.

**Example:** `src/content/posts/unaffiliated-20260128.mdx`

```mdx
---
title: "The Unaffiliated — 1/28/26"
slug: unaffiliated-20260128
description: "The Unaffiliated newsletter by The Colorado Sun, published January 28, 2026."
category: Newsletters
publishDate: 2026-01-28
author: The Colorado Sun
htmlFile: unaffiliated_01_28_2026.html
image: /images/custom-share-image.png
---

The Unaffiliated is a weekly newsletter covering Colorado politics, policy, and the inner workings of state government.

This edition covers the latest developments in the state legislature...
```

### Frontmatter Fields Reference

| Field | Required | Description |
|-------|----------|-------------|
| `title` | ✅ | Display title shown in header and listings |
| `slug` | ✅ | URL-safe identifier (used in `/view/{slug}/`) |
| `description` | ✅ | Short description for listings and SEO meta tags |
| `category` | ✅ | Category name (e.g., "Newsletters", "Data") |
| `publishDate` | ✅ | Date in `YYYY-MM-DD` format |
| `author` | ✅ | Author name |
| `htmlFile` | ✅ | Filename of HTML file in `static/html-files/` |
| `image` | ❌ | Custom share image (defaults to `/images/default-share.png`) |

### Step 3: Commit and Push

```bash
git add .
git commit -m "Add Unaffiliated newsletter 1/28/26"
git push origin main
```

The site will automatically rebuild and deploy within 2-3 minutes. Check the [Actions tab](https://github.com/coloradosun/colorado-sun-extras/actions) to monitor deployment status.

### Step 4: Verify

- **View page:** https://extras.coloradosun.com/view/{slug}/
- **Share page:** https://extras.coloradosun.com/share/{slug}/
- **Homepage:** https://extras.coloradosun.com/ (should show new post)

---

## URL Structure

| Route | Purpose |
|-------|---------|
| `/` | Homepage with all posts |
| `/view/{slug}/` | Full viewer with sidebar, metadata, edit link |
| `/share/{slug}/` | Clean share view (no edit buttons) |
| `/edit/{slug}/` | MDX editor with live preview |
| `/category/{category-slug}/` | Category listing page |
| `/categories/` | Index of all categories |

---

## Setting Up Git SSH Access (coloradosun GitHub User)

To push changes to the repository, you need SSH access configured for the `coloradosun` GitHub organization.

### Step 1: Generate an SSH Key

If you don't already have an SSH key, generate one:

```bash
ssh-keygen -t ed25519 -C "your.email@coloradosun.com"
```

When prompted:
- **File location:** Press Enter for default, or specify a custom path like `~/.ssh/id_coloradosun`
- **Passphrase:** Enter a secure passphrase (recommended) or leave blank

### Step 2: Add SSH Key to ssh-agent

```bash
# Start the ssh-agent
eval "$(ssh-agent -s)"

# Add your key
ssh-add ~/.ssh/id_ed25519
# Or if you used a custom path:
ssh-add ~/.ssh/id_coloradosun
```

### Step 3: Add SSH Key to GitHub

1. Copy your public key:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   # Or: cat ~/.ssh/id_coloradosun.pub
   ```

2. Go to GitHub → Settings → SSH and GPG keys → New SSH key

3. Give it a descriptive title (e.g., "Work MacBook - Colorado Sun")

4. Paste the public key and save

### Step 4: Configure SSH for Multiple GitHub Accounts (Optional)

If you have multiple GitHub accounts, create or edit `~/.ssh/config`:

```
# Personal GitHub
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_personal

# Colorado Sun GitHub
Host github.com-coloradosun
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_coloradosun
```

Then clone using the custom host:
```bash
git clone git@github.com-coloradosun:coloradosun/colorado-sun-extras.git
```

### Step 5: Clone the Repository

```bash
# Standard clone (if only one GitHub account)
git clone git@github.com:coloradosun/colorado-sun-extras.git

# Or with custom host (if multiple accounts)
git clone git@github.com-coloradosun:coloradosun/colorado-sun-extras.git

cd colorado-sun-extras
```

### Step 6: Verify Access

```bash
# Test SSH connection
ssh -T git@github.com
# Expected output: "Hi username! You've successfully authenticated..."

# Verify remote
git remote -v
# Should show: git@github.com:coloradosun/colorado-sun-extras.git
```

---

## Local Development

### Prerequisites

- Node.js 20.x or later
- npm 10.x or later

### Setup

```bash
# Install dependencies (note: --legacy-peer-deps is required)
npm install --legacy-peer-deps

# Start development server
npm run develop
```

The site will be available at http://localhost:8000

### Common Commands

| Command | Description |
|---------|-------------|
| `npm run develop` | Start dev server with hot reload |
| `npm run build` | Production build |
| `npm run serve` | Serve production build locally |
| `npm run clean` | Clear Gatsby cache (use if seeing stale data) |

### Troubleshooting

**Stale data or build errors:**
```bash
npm run clean && npm run develop
```

**Dependency issues:**
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

---

## Deployment

Deployment is fully automated via GitHub Actions. When you push to `main`:

1. GitHub Actions triggers the `deploy.yml` workflow
2. Dependencies are installed and Gatsby builds the site
3. The `public/` folder is deployed to GitHub Pages
4. The site is live at https://extras.coloradosun.com

### Manual Deployment (Emergency)

If you need to trigger a deployment without code changes:

1. Go to [Actions](https://github.com/coloradosun/colorado-sun-extras/actions)
2. Select "Deploy to GitHub Pages"
3. Click "Run workflow" → "Run workflow"

### Monitoring Deployments

- Check status: https://github.com/coloradosun/colorado-sun-extras/actions
- Green checkmark = successful deployment
- Red X = failed (click to see error logs)

---

## Metadata & Social Sharing

Each post automatically generates Open Graph and Twitter Card metadata for rich social sharing previews.

### Default Share Image

Place at: `static/images/default-share.png`

Recommended dimensions: 1200×630 pixels (Facebook/LinkedIn) or 1200×600 (Twitter)

### Custom Share Image Per Post

Add `image` field to frontmatter:

```yaml
image: /images/my-custom-share.png
```

Images can be:
- Relative paths (placed in `static/images/`)
- Full URLs (`https://example.com/image.png`)

---

## Support & Contacts

- **Repository Issues:** https://github.com/coloradosun/colorado-sun-extras/issues
- **Technical Questions:** [Your contact here]

---

## Changelog

| Date | Change |
|------|--------|
| 2026-01-28 | Added Open Graph/Twitter Card metadata |
| 2026-01-28 | Fixed share URL to include full domain |
| 2026-01-28 | Added trailing slash configuration |
| 2026-01-27 | Initial deployment to extras.coloradosun.com |
