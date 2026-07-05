"use client";

import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react";
import DropZone from "./DropZone";
import VideoPreview from "./VideoPreview";
import GifPreview from "./GifPreview";
import ProgressBar from "./ProgressBar";
import { validateVideoFile } from "@/lib/utils";
import { GIF_DEFAULTS } from "@/lib/constants";

type Stage = "idle" | "loading-engine" | "converting" | "done" | "error";

interface GifResult {
  url: string;
  blob: Blob;
}

export default function VideoToGifConverter() {
  const [stage, setStage] = useState<Stage>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("Preparing");
  const [gifResult, setGifResult] = useState<GifResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const conversionTokenRef = useRef(0);

  // Clean up object URLs when they change or on unmount to avoid memory leaks.
  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);

  useEffect(() => {
    return () => {
      if (gifResult) URL.revokeObjectURL(gifResult.url);
    };
  }, [gifResult]);

  const resetAll = useCallback(() => {
    conversionTokenRef.current += 1;
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    if (gifResult) URL.revokeObjectURL(gifResult.url);
    setStage("idle");
    setFile(null);
    setVideoUrl(null);
    setVideoDuration(null);
    setProgress(0);
    setProgressLabel("Preparing");
    setGifResult(null);
    setErrorMessage(null);
  }, [videoUrl, gifResult]);

  const handleFileSelected = useCallback(
    (selectedFile: File) => {
      const validation = validateVideoFile(selectedFile);
      if (!validation.valid) {
        setErrorMessage(validation.error ?? "This file could not be used.");
        setStage("error");
        return;
      }

      if (videoUrl) URL.revokeObjectURL(videoUrl);
      if (gifResult) URL.revokeObjectURL(gifResult.url);

      const url = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setVideoUrl(url);
      setVideoDuration(null);
      setGifResult(null);
      setErrorMessage(null);
      setProgress(0);
      setStage("idle");
    },
    [videoUrl, gifResult]
  );

  const handleConvert = useCallback(async () => {
    if (!file) return;

    const myToken = ++conversionTokenRef.current;
    setStage("loading-engine");
    setProgressLabel("Loading FFmpeg engine");
    setProgress(0);
    setErrorMessage(null);

    try {
      const { convertVideoToGif } = await import("@/lib/ffmpeg");

      const blob = await convertVideoToGif({
        file,
        fps: GIF_DEFAULTS.fps,
        scaleWidth: GIF_DEFAULTS.scaleWidth,
        onProgress: (ratio) => {
          if (conversionTokenRef.current !== myToken) return;
          setStage("converting");
          setProgressLabel("Converting frames");
          setProgress(ratio);
        },
        onLog: () => {
          // Logs are available here for debugging if needed.
        },
      });

      if (conversionTokenRef.current !== myToken) return;

      const url = URL.createObjectURL(blob);
      setGifResult({ url, blob });
      setProgress(1);
      setStage("done");
    } catch (error) {
      if (conversionTokenRef.current !== myToken) return;
      console.error(error);
      setErrorMessage(
        "Something went wrong while converting this video. Try a shorter clip or a different format."
      );
      setStage("error");
    }
  }, [file]);

  const handleDownload = useCallback(() => {
    if (!gifResult || !file) return;
    const anchor = document.createElement("a");
    anchor.href = gifResult.url;
    const baseName = file.name.replace(/\.[^.]+$/, "");
    anchor.download = `${baseName || "converted"}.gif`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }, [gifResult, file]);

  const handleVideoMetadata = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      const el = event.currentTarget;
      if (Number.isFinite(el.duration)) setVideoDuration(el.duration);
    },
    []
  );

  const isBusy = stage === "loading-engine" || stage === "converting";

  return (
    <div className="mx-auto max-w-3xl">
      {!file && (
        <DropZone onFileSelected={handleFileSelected} disabled={isBusy} />
      )}

      {errorMessage && (
        <div
          role="alert"
          className="mt-4 rounded-xl2 border border-danger/40 bg-danger/10 px-5 py-4 text-sm text-danger"
        >
          {errorMessage}
        </div>
      )}

      {file && videoUrl && stage !== "done" && (
        <div className="space-y-6">
          <VideoPreview
            file={file}
            url={videoUrl}
            duration={videoDuration}
            onLoadedMetadata={handleVideoMetadata}
          />

          {isBusy && (
            <div className="rounded-xl2 border border-surface-border bg-surface p-6">
              <ProgressBar ratio={progress} label={progressLabel} />
              <p className="mt-4 text-center text-xs text-ink-faint">
                {stage === "loading-engine"
                  ? "Downloading the conversion engine the first time you use it…"
                  : "Encoding your GIF locally — this never leaves your browser."}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleConvert}
              disabled={isBusy}
              className="flex-1 rounded-full bg-reel-gradient px-6 py-3.5 text-center font-display text-sm font-semibold text-canvas shadow-glow transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isBusy ? "Converting…" : "Convert to GIF"}
            </button>
            <button
              type="button"
              onClick={resetAll}
              disabled={isBusy}
              className="flex-1 rounded-full border border-surface-border bg-surface px-6 py-3.5 text-center text-sm font-semibold text-ink transition hover:border-ink-faint disabled:cursor-not-allowed disabled:opacity-60"
            >
              Choose a different video
            </button>
          </div>
        </div>
      )}

      {stage === "done" && gifResult && file && (
        <GifPreview
          url={gifResult.url}
          sizeBytes={gifResult.blob.size}
          fileName={file.name}
          onDownload={handleDownload}
          onReset={resetAll}
        />
      )}
    </div>
  );
}

