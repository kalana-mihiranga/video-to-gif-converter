import type { FFmpeg } from "@ffmpeg/ffmpeg";
import { GIF_DEFAULTS, REEL_DEFAULTS } from "./constants";

/**
 * Singleton holder for the FFmpeg instance. FFmpeg.wasm (and its underlying
 * wasm binary) is only fetched the first time `getFFmpeg` is called, which
 * happens lazily after the user selects a video — never on initial page load.
 */
let ffmpegInstance: FFmpeg | null = null;
let loadingPromise: Promise<FFmpeg> | null = null;

export type ProgressCallback = (ratio: number) => void;
export type LogCallback = (message: string) => void;

const CORE_BASE_URL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";

export async function getFFmpeg(onLog?: LogCallback): Promise<FFmpeg> {
  if (ffmpegInstance) return ffmpegInstance;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    // Dynamic imports: nothing FFmpeg-related is in the initial JS bundle.
    const { FFmpeg: FFmpegClass } = await import("@ffmpeg/ffmpeg");
    const { toBlobURL } = await import("@ffmpeg/util");

    const instance = new FFmpegClass();

    if (onLog) {
      instance.on("log", ({ message }: { message: string }) => {
        onLog(message);
      });
    }

    const [coreURL, wasmURL] = await Promise.all([
      toBlobURL(`${CORE_BASE_URL}/ffmpeg-core.js`, "text/javascript"),
      toBlobURL(`${CORE_BASE_URL}/ffmpeg-core.wasm`, "application/wasm"),
    ]);

    await instance.load({ coreURL, wasmURL });

    ffmpegInstance = instance;
    return instance;
  })();

  return loadingPromise;
}

export interface ConvertOptions {
  file: File;
  fps?: number;
  scaleWidth?: number;
  startTime?: number;
  duration?: number;
  onProgress?: ProgressCallback;
  onLog?: LogCallback;
}

/**
 * Converts a video file to an optimized GIF using a two-pass
 * palettegen / paletteuse pipeline for high quality output at a small
 * file size, entirely inside the browser.
 */
export async function convertVideoToGif({
  file,
  fps = GIF_DEFAULTS.fps,
  scaleWidth = GIF_DEFAULTS.scaleWidth,
  startTime,
  duration,
  onProgress,
  onLog,
}: ConvertOptions): Promise<Blob> {
  const { fetchFile } = await import("@ffmpeg/util");
  const ffmpeg = await getFFmpeg(onLog);

  const inputName = "input" + getExtension(file.name);
  const paletteName = "palette.png";
  const outputName = "output.gif";

  if (onProgress) {
    ffmpeg.on("progress", ({ progress }: { progress: number }) => {
      // Progress can occasionally report >1 or NaN depending on the input;
      // clamp it so the UI progress bar always stays sane.
      const safe = Number.isFinite(progress) ? Math.min(Math.max(progress, 0), 1) : 0;
      onProgress(safe);
    });
  }

  await ffmpeg.writeFile(inputName, await fetchFile(file));

  const trimArgs: string[] = [];
  if (typeof startTime === "number" && startTime > 0) {
    trimArgs.push("-ss", String(startTime));
  }
  if (typeof duration === "number" && duration > 0) {
    trimArgs.push("-t", String(duration));
  }

  const filter = `fps=${fps},scale=${scaleWidth}:-1:flags=lanczos`;

  // Pass 1: generate an optimized color palette for this specific clip.
  await ffmpeg.exec([
    ...trimArgs,
    "-i",
    inputName,
    "-vf",
    `${filter},palettegen=stats_mode=diff`,
    "-y",
    paletteName,
  ]);

  // Pass 2: apply the palette while encoding the final GIF.
  await ffmpeg.exec([
    ...trimArgs,
    "-i",
    inputName,
    "-i",
    paletteName,
    "-lavfi",
    `${filter}[x];[x][1:v]paletteuse=dither=sierra2_4a`,
    "-y",
    outputName,
  ]);

  const data = await ffmpeg.readFile(outputName);
  const bytes = data as Uint8Array;

  // Clean up the virtual filesystem so repeated conversions don't leak memory.
  await Promise.all(
    [inputName, paletteName, outputName].map((name) =>
      ffmpeg.deleteFile(name).catch(() => undefined)
    )
  );

  return new Blob([new Uint8Array(bytes)], { type: "image/gif" });
}

function getExtension(filename: string): string {
  const match = /\.[^.]+$/.exec(filename);
  return match ? match[0] : ".mp4";
}

export interface ConvertToReelOptions {
  file: File;
  width?: number;
  height?: number;
  fps?: number;
  maxDurationSeconds?: number;
  onProgress?: ProgressCallback;
  onLog?: LogCallback;
}

/**
 * Reformats any video into a vertical 9:16 Facebook Reel: crops to fill
 * 720x1280 (no letterboxing), re-encodes to H.264/AAC MP4 with faststart,
 * and trims to Facebook's 90-second Reels limit. Runs entirely client-side
 * using the same lazily-loaded FFmpeg singleton as the GIF converter.
 */
export async function convertVideoToReel({
  file,
  width = REEL_DEFAULTS.width,
  height = REEL_DEFAULTS.height,
  fps = REEL_DEFAULTS.fps,
  maxDurationSeconds = REEL_DEFAULTS.maxDurationSeconds,
  onProgress,
  onLog,
}: ConvertToReelOptions): Promise<Blob> {
  const { fetchFile } = await import("@ffmpeg/util");
  const ffmpeg = await getFFmpeg(onLog);

  const inputName = "input" + getExtension(file.name);
  const outputName = "output.mp4";

  if (onProgress) {
    ffmpeg.on("progress", ({ progress }: { progress: number }) => {
      const safe = Number.isFinite(progress) ? Math.min(Math.max(progress, 0), 1) : 0;
      onProgress(safe);
    });
  }

  await ffmpeg.writeFile(inputName, await fetchFile(file));

  // Crop-to-fill 9:16 (no black bars), cap duration, re-encode for Reels.
  await ffmpeg.exec([
    "-i",
    inputName,
    "-t",
    String(maxDurationSeconds),
    "-vf",
    `scale=${width}:${height}:force_original_aspect_ratio=increase,crop=${width}:${height},fps=${fps}`,
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-crf",
    "23",
    "-pix_fmt",
    "yuv420p",
    "-c:a",
    "aac",
    "-b:a",
    "128k",
    "-movflags",
    "+faststart",
    "-y",
    outputName,
  ]);

  const data = await ffmpeg.readFile(outputName);
  const bytes = data as Uint8Array;

  await Promise.all(
    [inputName, outputName].map((name) => ffmpeg.deleteFile(name).catch(() => undefined))
  );

  return new Blob([new Uint8Array(bytes)], { type: "video/mp4" });
}