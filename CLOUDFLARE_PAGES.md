# Cloudflare Pages Configuration

## Important: Remove Deploy Command

Cloudflare Pages is trying to run `npx wrangler deploy` which is for Cloudflare Workers, NOT Pages.

**You must remove the deploy command from Cloudflare Pages settings:**

1. Go to your Cloudflare Pages project dashboard
2. Navigate to **Settings** → **Builds & deployments**
3. Find the **Deploy command** field
4. **DELETE/REMOVE** the deploy command (leave it empty)
5. Save changes

## Correct Build Settings

Configure your Cloudflare Pages project with these settings:

### Build Configuration
- **Framework preset**: Angular (or None)
- **Build command**: `npm run build:prod`
- **Build output directory**: `dist/protfolio-template-v1/browser`
- **Root directory**: `/` (leave empty)
- **Node version**: `20`
- **Deploy command**: (leave EMPTY - do not set this)

### Environment Variables (if needed)
- Add any environment variables in **Settings** → **Environment variables**

## Build Output

The Angular build outputs to:
- **Location**: `dist/protfolio-template-v1/browser/`
- **Contains**: All static files (HTML, JS, CSS, assets)

## SPA Routing

The `public/_redirects` file ensures Angular routing works correctly:
- All routes redirect to `/index.html` with status 200
- This file is automatically copied to the build output

## After Configuration

1. Remove the deploy command from Cloudflare Pages
2. Update build settings as shown above
3. Push a new commit to trigger a rebuild
4. The build should succeed and deploy automatically

