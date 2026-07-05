# Video to GIF Converter

A free, privacy-first Video to GIF converter built with Next.js 15, React 19,
TypeScript and FFmpeg.wasm. Every conversion happens **entirely in the
browser** — no video is ever uploaded to a server.

## Features

- Drag & drop or browse to upload MP4, MOV, AVI, WebM or MKV files
- 100% client-side conversion using `@ffmpeg/ffmpeg` + `@ffmpeg/util`
- FFmpeg is loaded lazily via dynamic import — it is never downloaded until
  a user selects a video
- High-quality two-pass GIF encoding (`palettegen` + `paletteuse`)
- Live progress bar during conversion
- Video and GIF previews, one-click download
- Fully responsive, dark-mode UI built with Tailwind CSS
- SEO-ready: metadata, Open Graph, Twitter cards, canonical URLs,
  `robots.ts`, `sitemap.ts`, and JSON-LD structured data
  (SoftwareApplication, FAQPage, BreadcrumbList)
- Accessible: ARIA labels, keyboard-operable drop zone, visible focus rings,
  `prefers-reduced-motion` support

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/
  layout.tsx          Root layout, fonts, base metadata
  page.tsx            Landing page (Server Component)
  robots.ts           robots.txt generation
  sitemap.ts          sitemap.xml generation
  globals.css         Tailwind + design tokens
  video-to-gif/
    page.tsx          Converter page (Server Component + Suspense)
components/
  Header.tsx
  Footer.tsx
  Hero.tsx
  Features.tsx
  SeoContent.tsx
  FAQ.tsx
  RelatedTools.tsx
  CTA.tsx
  converter/
    VideoToGifConverter.tsx   Main client component (state machine)
    DropZone.tsx              Drag & drop / browse upload
    VideoPreview.tsx          Source video preview
    GifPreview.tsx            Converted GIF preview + download
    ProgressBar.tsx           Conversion progress bar
lib/
  ffmpeg.ts           Lazy FFmpeg.wasm loader + conversion pipeline
  utils.ts            File validation & formatting helpers
  constants.ts         Site copy, FAQ, related tools, defaults
  schema.ts           JSON-LD structured data builders
```

## How the conversion works

1. FFmpeg.wasm is dynamically imported only after a video is selected.
2. The FFmpeg core (`ffmpeg-core.js` / `.wasm`) is fetched from a CDN and
   converted to a Blob URL via `@ffmpeg/util`'s `toBlobURL`, then loaded
   into a Web Worker-backed FFmpeg instance.
3. **Pass 1** analyzes the clip and builds an optimized color palette with
   `palettegen`.
4. **Pass 2** re-encodes the video at `fps=12`, `scale=480:-1` and applies
   the palette with `paletteuse` (Sierra dithering) for a smooth, small
   GIF.
5. The resulting GIF is returned as a `Blob`, previewed with an `<img>`
   tag, and can be downloaded with a single click.

No video data is ever sent over the network — only the (public, open
source) FFmpeg engine binary is fetched, once per session.

## Deployment

### Vercel

This project works out of the box on Vercel:

```bash
vercel deploy
```

### Cloudflare Pages

Build command: `npm run build`
Output directory: `.next` (use the official `@cloudflare/next-on-pages`
adapter, or deploy as a static export if you remove server-only features).

## Notes on cross-origin isolation

`next.config.ts` sets `Cross-Origin-Opener-Policy` and
`Cross-Origin-Embedder-Policy` headers. These are not required for the
single-threaded FFmpeg core used by default, but are included so you can
upgrade to the multi-threaded `@ffmpeg/core-mt` build for faster
conversions without any extra configuration.

## Assets to add

- `public/og-image.png` (1200×630) — referenced by the Open Graph /
  Twitter metadata in `app/layout.tsx`. A gradient app icon is already
  provided at `public/icon.svg` and wired up in `app/layout.tsx`, so a
  favicon works out of the box; swap in your own `favicon.ico` /
  `og-image.png` whenever you're ready for final branding.

## License

MIT
