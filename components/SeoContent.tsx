import Link from "next/link";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";

export default function SeoContent() {
  return (
    <section
      id="how-it-works"
      className="border-t border-surface-border/60 bg-canvas py-20 md:py-28"
    >
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          How the Video to GIF converter works
        </h2>
        <p className="mt-5 leading-relaxed text-ink-muted">
          Converting a video into a GIF sounds simple, but doing it well takes
          a real video engine. Most online converters solve this by uploading
          your file to a remote server, converting it there, and sending the
          result back. That approach works, but it means your video —
          personal clips, unreleased footage, screen recordings full of
          sensitive information — has to leave your device and sit on
          somebody else’s infrastructure, even if only briefly.
        </p>
        <p className="mt-4 leading-relaxed text-ink-muted">
          This converter takes a different approach. It runs a full build of
          FFmpeg, compiled to WebAssembly, directly inside your browser tab.
          When you choose a file, nothing is uploaded anywhere. Instead, the
          FFmpeg engine loads locally (a small one-time download) and reads
          your video frame by frame using your own device’s CPU. The GIF is
          assembled entirely on your machine, and the finished file is handed
          straight back to you for download.
        </p>

        <div className="mt-10 space-y-6">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <div key={step.title} className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-reel-gradient font-mono text-sm font-semibold text-canvas">
                {index + 1}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-14 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Why convert video to GIF in the browser
        </h2>
        <p className="mt-5 leading-relaxed text-ink-muted">
          Running the conversion locally has advantages beyond privacy. Because
          there is no upload or download of the source video, the process
          starts immediately instead of waiting on your internet connection.
          For large video files, this can save significant time compared to
          uploading a multi-hundred-megabyte clip to a server before
          conversion even begins. It also means there is no arbitrary size
          limit imposed by a server-side queue, no risk of the file sitting in
          a stranger’s storage bucket, and no need to trust a third party with
          content you have not published yet.
        </p>
        <p className="mt-4 leading-relaxed text-ink-muted">
          GIFs remain one of the most universally supported ways to share a
          short moving image. Unlike video files, GIFs autoplay everywhere —
          in chat apps, forums, emails, and social feeds — without a player,
          a click, or a "tap to play" prompt. That makes them ideal for
          reaction clips, product demos, bug reports, tutorials, and memes.
          The tradeoff is file size and color depth, which is exactly why this
          converter uses a two-pass palette pipeline instead of a naive
          single-pass conversion.
        </p>

        <h2 className="mt-14 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          How the quality pipeline works
        </h2>
        <p className="mt-5 leading-relaxed text-ink-muted">
          A GIF can only use up to 256 colors per frame, so naively converting
          video to GIF often produces banding, dithering artifacts, or muddy
          colors. To avoid that, this tool runs FFmpeg’s conversion in two
          passes. The first pass analyzes your clip and builds a custom color
          palette tailored to its actual content using{" "}
          <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm text-cyan">
            palettegen
          </code>
          . The second pass re-encodes the video using that palette with{" "}
          <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm text-cyan">
            paletteuse
          </code>
          , applying high-quality dithering so gradients and skin tones look
          smooth instead of blocky. Frames are sampled at 12 frames per
          second and scaled to 480 pixels wide by default — a balance that
          Ezgif-style converters have popularized because it keeps motion
          looking fluid while keeping file size reasonable for sharing.
        </p>

        <h2 className="mt-14 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Best practices for smaller, better-looking GIFs
        </h2>
        <ul className="mt-5 list-disc space-y-3 pl-5 leading-relaxed text-ink-muted">
          <li>
            Trim your clip to the essential moment before converting — shorter
            clips mean smaller files and faster processing.
          </li>
          <li>
            Prefer clips with less camera shake and motion blur; palette-based
            GIFs render clean, high-contrast footage more faithfully.
          </li>
          <li>
            If your source video is very high resolution, expect the 480px
            output width to look sharp while keeping the file size manageable
            for chat apps and social platforms.
          </li>
          <li>
            Close other heavy browser tabs before converting very large video
            files, since the conversion uses your device’s memory and CPU.
          </li>
          <li>
            Keep the original video around if you plan to make several
            different GIFs from it — you can convert the same file multiple
            times in one session without re-uploading anything.
          </li>
        </ul>

        <h2 className="mt-14 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Supported formats and limits
        </h2>
        <p className="mt-5 leading-relaxed text-ink-muted">
          The converter accepts MP4, MOV, AVI, WebM and MKV files, covering
          footage exported from phones, screen recorders, cameras and editing
          software. Because everything runs on your device, we recommend
          keeping files under 300MB for a smooth experience — very large
          files will still work in most modern browsers, but will use more
          memory and take longer to process depending on your hardware.
        </p>
        <p className="mt-4 leading-relaxed text-ink-muted">
          Ready to try it yourself? Head over to the{" "}
          <Link href="/video-to-gif" className="text-cyan underline underline-offset-4">
            Video to GIF converter
          </Link>{" "}
          and drop in your first clip — it is free, unlimited, and nothing you
          upload ever leaves your browser.
        </p>
      </div>
    </section>
  );
}
