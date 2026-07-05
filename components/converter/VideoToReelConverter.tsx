"use client";

import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react";
import DropZone from "./DropZone";
import VideoPreview from "./VideoPreview";
import ReelPreview from "./ReelPreview";
import ProgressBar from "./ProgressBar";
import { validateVideoFile } from "@/lib/utils";
import { REEL_DEFAULTS } from "@/lib/constants";

type Stage = "idle" | "loading-engine" | "converting" | "done" | "error";

interface ReelResult {
  url: string;
  blob: Blob;
}

export default function VideoToReelConverter() {
  const [stage, setStage] = useState<Stage>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("Preparing");
  const [reelResult, setReelResult] = useState<ReelResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const conversionTokenRef = useRef(0);

  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);

  useEffect(() => {
    return () => {
      if (reelResult) URL.revokeObjectURL(reelResult.url);
    };
  }, [reelResult]);

  const resetAll = useCallback(() => {
    conversionTokenRef.current += 1;
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    if (reelResult) URL.revokeObjectURL(reelResult.url);
    setStage("idle");
    setFile(null);
    setVideoUrl(null);
    setVideoDuration(null);
    setProgress(0);
    setProgressLabel("Preparing");
    setReelResult(null);
    setErrorMessage(null);
  }, [videoUrl, reelResult]);

  const handleFileSelected = useCallback(
    (selectedFile: File) => {
      const validation = validateVideoFile(selectedFile);
      if (!validation.valid) {
        setErrorMessage(validation.error ?? "This file could not be used.");
        setStage("error");
        return;
      }

      if (videoUrl) URL.revokeObjectURL(videoUrl);
      if (reelResult) URL.revokeObjectURL(reelResult.url);

      const url = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setVideoUrl(url);
      setVideoDuration(null);
      setReelResult(null);
      setErrorMessage(null);
      setProgress(0);
      setStage("idle");
    },
    [videoUrl, reelResult]
  );

  const handleConvert = useCallback(async () => {
    if (!file) return;

    const myToken = ++conversionTokenRef.current;
    setStage("loading-engine");
    setProgressLabel("Loading FFmpeg engine");
    setProgress(0);
    setErrorMessage(null);

    try {
      const { convertVideoToReel } = await import("@/lib/ffmpeg");

      const blob = await convertVideoToReel({
        file,
        width: REEL_DEFAULTS.width,
        height: REEL_DEFAULTS.height,
        fps: REEL_DEFAULTS.fps,
        maxDurationSeconds: REEL_DEFAULTS.maxDurationSeconds,
        onProgress: (ratio) => {
          if (conversionTokenRef.current !== myToken) return;
          setStage("converting");
          setProgressLabel("Converting to Reel format");
          setProgress(ratio);
        },
        onLog: () => {
          // Logs are available here for debugging if needed.
        },
      });

      if (conversionTokenRef.current !== myToken) return;

      const url = URL.createObjectURL(blob);
      setReelResult({ url, blob });
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
    if (!reelResult || !file) return;
    const anchor = document.createElement("a");
    anchor.href = reelResult.url;
    const baseName = file.name.replace(/\.[^.]+$/, "");
    anchor.download = `${baseName || "converted"}-reel.mp4`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }, [reelResult, file]);

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
                  : "Cropping and encoding your Reel locally — this never leaves your browser."}
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
              {isBusy ? "Converting…" : "Convert to Reel"}
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

      {stage === "done" && reelResult && file && (
        <ReelPreview
          url={reelResult.url}
          sizeBytes={reelResult.blob.size}
          fileName={file.name}
          onDownload={handleDownload}
          onReset={resetAll}
        />
      )}
    </div>
  );
}
