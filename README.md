# Teal Sphinx — NestJS Static Blog

A minimal, elegant NestJS blog powered by JSON data and handlebars templates. All blog content is controlled via JSON files and HTML fragments, with a custom design system featuring teal, cyan, and beige colors.

## Features

- **JSON-driven content**: Post metadata and sources in `data/posts.json`
- **Static HTML fragments**: Post body loaded from `views/posts/post.<id>.hbs`
- **Handlebars templating**: Clean, semantic templates with two main views:
  - Welcome page: Posts timeline/grid with thumbnails
  - Blog page: Full article with header image, title, subtitle, date, body, and sources
- **Design system**: Teal primary, cyan accents, beige paper background with light/dark mode support
- **Responsive grid**: Auto-filling card layout on welcome page
- **Per-post header images**: Served from `public/images/headers/`

## Quick Start

```bash
npm install
npm run start:dev
# Open http://localhost:3000
```

## Project Structure

```
data/
  posts.json                 # Post metadata + sources array
views/
  layouts/
    main.hbs                 # Main layout wrapper
  index.hbs                  # Welcome page (posts list)
  post.hbs                   # Single post page
  posts/
    post.1.hbs               # Post #1 HTML body
    post.2.hbs               # Post #2 HTML body
    ...
public/
  images/headers/
    sample-header.svg        # Header images
  styles.css                 # Design system + component styles
src/
  blog.service.ts            # Load posts from JSON + HTML fragments
  blog.controller.ts         # GET /post/:id route
  welcome.controller.ts      # GET / route (welcome page)
  app.module.ts              # Module setup
  main.ts                    # Static assets, views, view engine config
```

## Adding a New Post

### 1. Add entry to `data/posts.json`:

```json
{
  "id": "2",
  "title": "Your Post Title",
  "subtitle": "A short description",
  "date": "2026-06-20",
  "headerImage": "my-header.svg",
  "sources": [{ "name": "Reference", "link": "https://example.com" }]
}
```

### 2. Create post body at `views/posts/post.2.hbs`:

```html
<p>Your post content here.</p>
<img src="/images/content/image.png" alt="description" />
<blockquote>A meaningful quote.</blockquote>
```

### 3. Add header image to `public/images/headers/my-header.svg`

The post is now live at `/post/2`.

## Routes

- `GET /` — Welcome page (lists all posts)
- `GET /post/:id` — Single post page
- `GET /styles.css` — Stylesheet
- `GET /images/*` — Static images

## Styling

Colors and fonts are in `public/styles.css`:

**Light mode**: beige paper, ink text, teal primary, cyan accent  
**Dark mode**: deep teal bg, beige text, cyan primary, teal accent  
**Typography**: Fraunces (display), Source Serif 4 (body), Inter (UI)

CSS variables:

- `--beige, --brown, --teal, --cyan, --ink` — Color palette
- `--bg, --fg, --primary, --accent, --muted` — Functional colors
- `--shadow-paper` — Card drop shadow
- `--gradient-banner` — Header gradient
- `--font-display, --font-serif, --font-sans` — Typography

## Development

```bash
npm run build          # Build for production
npm run start:prod     # Run compiled app
npm run start:dev      # Watch mode
npm run test           # Run tests
npm run format         # Format code
npm run lint           # Lint & fix
```

## Notes

- Post ID must match filename: id `"1"` → `post.1.hbs`
- Missing HTML file returns 404
- Sources array in JSON is optional
- Header images support SVG, PNG, JPG, WEBP
- Template uses `{{{post.html}}}` (triple braces) to render HTML

## License

Teal Sphinx is built with NestJS and made with ❤️.
