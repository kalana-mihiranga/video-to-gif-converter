export const SITE_NAME = "GifReel";
export const SITE_URL = "https://www.gifreel.app";
export const SITE_TITLE = "Free Video to GIF Converter Online";
export const SITE_DESCRIPTION =
  "Convert MP4, MOV, AVI and WebM videos into GIF online for free. Everything runs securely inside your browser.";

export const ACCEPTED_VIDEO_TYPES = [
  "video/mp4",
  "video/quicktime",
  "video/x-msvideo",
  "video/webm",
  "video/x-matroska",
] as const;

export const ACCEPTED_EXTENSIONS = [".mp4", ".mov", ".avi", ".webm", ".mkv"];

// 300 MB — generous client-side limit to keep memory/tab stable.
export const MAX_FILE_SIZE_BYTES = 300 * 1024 * 1024;

export const GIF_DEFAULTS = {
  fps: 12,
  scaleWidth: 480,
};

export const REEL_DEFAULTS = {
  width: 720,
  height: 1280,
  fps: 30,
  maxDurationSeconds: 90, // Facebook Reels cap
};

export const RELATED_TOOLS = [
  {
    name: "Video to Facebook Reel",
    href: "/video-to-reel",
    description:
      "Reformat any video into a 9:16 Facebook Reel — cropped, scaled and trimmed automatically.",
  },
  {
    name: "GIF to MP4 Converter",
    href: "/video-to-gif",
    description: "Turn animated GIFs back into lightweight MP4 video clips.",
  },
  {
    name: "Video Compressor",
    href: "/video-to-gif",
    description: "Shrink video file size in the browser before sharing.",
  },
  {
    name: "GIF Optimizer",
    href: "/video-to-gif",
    description: "Reduce GIF file size while keeping visual quality.",
  },
];

export const FAQ_ITEMS = [
  {
    question: "Is this Video to GIF converter really free?",
    answer:
      "Yes. The converter is 100% free with no watermark, no sign-up and no limit on how many videos you convert.",
  },
  {
    question: "Do you upload my video to a server?",
    answer:
      "No. Your video is decoded and converted entirely inside your browser using FFmpeg.wasm. The file never leaves your computer.",
  },
  {
    question: "Which video formats are supported?",
    answer:
      "You can upload MP4, MOV, AVI, WebM and MKV files. The converter reads the file directly in your browser, so most common codecs work out of the box.",
  },
  {
    question: "What is the maximum file size?",
    answer:
      "Because conversion happens on your device, we recommend files up to 300 MB for the smoothest experience. Larger files may work but can use more memory and take longer.",
  },
  {
    question: "Why does the first conversion take longer?",
    answer:
      "The first time you convert, your browser downloads the FFmpeg WebAssembly engine (a one-time download of a few megabytes). Subsequent conversions in the same session start instantly.",
  },
  {
    question: "Can I control the GIF frame rate and size?",
    answer:
      "The converter automatically generates a smooth 12 fps GIF scaled to 480px wide, tuned for a great balance between quality and file size for sharing online.",
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    title: "Choose your video",
    description:
      "Drag and drop a video file or browse your device. MP4, MOV, AVI, WebM and MKV are all supported.",
  },
  {
    title: "Convert in your browser",
    description:
      "FFmpeg.wasm loads locally and processes every frame on your device — nothing is ever uploaded.",
  },
  {
    title: "Preview and download",
    description:
      "Watch a live preview of your GIF, then download it instantly in one click.",
  },
];