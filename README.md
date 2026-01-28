# Colorado Sun Extras

Interactive data visualizations and newsletter archives from [The Colorado Sun](https://coloradosun.com).

**Live site:** [extras.coloradosun.com](https://extras.coloradosun.com)

## Overview

A Gatsby 5 static site that hosts self-contained HTML interactives with a two-column viewer layout. Features collapsible sidebar with metadata, share URLs, and processed template variables.

## Tech Stack

- **Framework:** Gatsby 5 + React 18
- **UI Components:** React Aria Components (accessible, headless)
- **Styling:** Tailwind CSS 3 with typography plugin
- **Content:** MDX files as single source of truth
- **Fonts:** Libre Franklin (UI), Martel (content)
- **Deployment:** GitHub Pages via Actions

## Route Structure

| Route | Purpose |
|-------|---------|
| `/` | Homepage catalog of all posts |
| `/view/{slug}` | Full viewer with sidebar, metadata, edit link |
| `/share/{slug}` | Minimal share view (no nav links) |
| `/edit/{slug}` | MDX editor with preview |
| `/category/{slug}` | Posts filtered by category |
| `/categories` | Grid of all categories |

## Publishing a New Interactive

### 1. Add the HTML file

Place your self-contained HTML file in:

```
static/html-files/your-file-name.html
```

### 2. Create the MDX post

Create a new file in `src/content/posts/{slug}.mdx`:

```mdx
---
title: Display Title
slug: your-url-slug
description: Brief description for the sidebar
category: Newsletters
publishDate: 2025-07-11
author: The Colorado Sun
htmlFile: your-file-name.html
---

Optional sidebar content goes here. This appears in the collapsible 
left panel and uses serif font (Martel).
```

### 3. Push to main

```bash
git add .
git commit -m "Add new interactive: Your Title"
git push origin main
```

GitHub Actions will automatically build and deploy to extras.coloradosun.com.

## Template Variables

The HTML embed processor automatically replaces these variables:

| Variable | Replacement |
|----------|-------------|
| `%TODAY%` | Formatted publish date (e.g., "Friday, July 11, 2025") |
| `%SENDER-INFO-SINGLELINE%` | Removed entirely |

## Local Development

```bash
# Install dependencies (always use --legacy-peer-deps)
npm install --legacy-peer-deps

# Start dev server
npm run develop

# View site at http://localhost:8000
```

### Development Commands

| Command | Purpose |
|---------|---------|
| `npm run develop` | Start dev server with hot reload |
| `npm run build` | Production build to ./public |
| `npm run serve` | Preview production build locally |
| `npm run clean` | Clear Gatsby cache (fixes stale data issues) |

## Project Structure

```
src/
  components/              # Reusable React components
    Layout.js              # Header/footer wrapper
    ProcessedHtmlEmbed.js  # Template variable processor
    HtmlEmbed.js           # Simple iframe wrapper
  content/posts/           # MDX files (source of truth)
  pages/index.js           # Homepage
  styles/global.css        # Tailwind imports
  templates/               # Dynamic page templates
    post.js                # /view/{slug}
    share.js               # /share/{slug}
    edit.js                # /edit/{slug}
    category.js            # /category/{slug}
    category-index.js      # /categories

static/
  html-files/              # Self-contained HTML interactives
  images/
    logo.png               # Site logo (min 200px wide)

.github/
  workflows/deploy.yml     # GitHub Actions deployment
  copilot-instructions.md  # AI coding assistant context
```

## Brand Colors

- **sun-gold:** `#fcd232` (primary accent)
- **sun-dark:** `#0e211f` (backgrounds, text)

## Deployment

Deployment is automatic via GitHub Actions on push to `main`. The workflow:

1. Checks out the code
2. Installs dependencies with `npm ci --legacy-peer-deps`
3. Builds the Gatsby site
4. Deploys to GitHub Pages

The custom domain `extras.coloradosun.com` is configured in the repository settings.

## Troubleshooting

**Stale data or missing pages:** Run `npm run clean` then `npm run develop`

**HTML file not loading:** Ensure it's in `static/html-files/` (not `public/`)

**Date showing wrong day:** The MDX frontmatter uses `YYYY-MM-DD` format and is parsed as local time to avoid timezone issues

**Fonts not loading:** Google Fonts are loaded via `gatsby-plugin-google-fonts`
