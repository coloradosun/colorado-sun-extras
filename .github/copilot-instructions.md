# Copilot Instructions for Colorado Sun Extras

## Project Overview

A **Gatsby 5** static site hosting interactive HTML data visualizations for The Colorado Sun. Features a catalog of self-contained HTML files with MDX-powered content pages and an in-browser editor.

## Architecture

- **Framework**: Gatsby 5.16 + React 18
- **UI Components**: React Aria Components (headless, accessible)
- **Styling**: Tailwind CSS 3 with `tailwindcss-react-aria-components` + `@tailwindcss/typography` plugins
- **Content**: MDX files in `src/content/posts/` are the **single source of truth** for all content
- **Data Layer**: `gatsby-plugin-mdx` processes MDX frontmatter for GraphQL queries

### Brand Colors
- `sun-gold`: #fcd232 (primary accent)
- `sun-dark`: #0e211f (backgrounds, text)

### Route Structure
| Route | Template | Purpose |
|-------|----------|---------|
| `/` | `src/pages/index.js` | Homepage catalog |
| `/view/{slug}` | `src/templates/post.js` | View interactive with metadata |
| `/share/{slug}` | `src/templates/share.js` | Minimal share view (no edit/nav) |
| `/edit/{slug}` | `src/templates/edit.js` | MDX editor with preview |
| `/category/{slug}` | `src/templates/category.js` | Category listing with sidebar |
| `/categories` | `src/templates/category-index.js` | Grid of all categories |

### Key Data Flow
1. MDX files in `src/content/posts/` contain frontmatter metadata + content
2. `gatsby-node.js` queries `allMdx` to generate all dynamic pages
3. HTML files in `public/html-files/` are embedded via `<HtmlEmbed>` component in MDX

## Developer Workflow

```bash
npm run develop    # Start dev server at localhost:8000
npm run build      # Production build
npm run clean      # Clear Gatsby cache (use when seeing stale data)
npm run serve      # Preview production build locally
```

**Important**: Always use `--legacy-peer-deps` when installing new packages.

## Adding New Interactive Posts

1. Place HTML file in `static/html-files/` (Gatsby copies to `public/` on build)
2. Create MDX file in `src/content/posts/{slug}.mdx` with required frontmatter:
   ```mdx
   ---
   title: Display Title
   slug: kebab-case-slug
   description: Brief description
   category: Newsletters
   publishDate: 2025-01-27
   author: The Colorado Sun
   htmlFile: your-file.html
   ---

   Your content here (appears in sidebar)...
   ```
3. Run `npm run clean && npm run develop` to regenerate pages

**Note**: The `htmlFile` frontmatter field is used to render the HTML in a full-height iframe. MDX content appears in the collapsible sidebar.

## Code Patterns

- **Layout**: All pages use `<Layout>` from [src/components/Layout.js](src/components/Layout.js)
- **GraphQL**: Use Gatsby's `graphql` tagged template for static queries
- **Head API**: Export `Head` function for SEO instead of react-helmet
- **HTML Embeds**: Use `<HtmlEmbed file="name.html" height="600px" />` in MDX
- **React Aria**: Import from `react-aria-components` for accessible UI (Button, Disclosure, etc.)

## Project Structure

```
src/
  components/         # Reusable components (Layout, HtmlEmbed)
  content/posts/      # MDX content files (single source of truth)
  pages/index.js      # Homepage
  templates/          # Dynamic page templates
  styles/global.css   # Tailwind imports
static/html-files/    # Self-contained HTML interactives (copied to public/ on build)
gatsby-node.js        # Dynamic page generation
```
