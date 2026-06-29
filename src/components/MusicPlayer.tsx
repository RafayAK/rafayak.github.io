import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  /** Track URL (under /public). Placeholder by default — swap for a real file. */
  src?: string;
  title?: string;
};

/**
 * Ambient music toggle, in the spirit of creative.inc.
 * Lives in BaseLayout with `transition:persist` so playback survives blog
 * navigations when the View Transitions router is active.
 */
export default function MusicPlayer({
  src = '/media/ambient_creation_uno.mp4',
  title = 'Ambient',
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Check if we are on a blog page (including root blog and posts)
  const isBlogPage = () => {
    if (typeof window === 'undefined') return false;
    const base = import.meta.env.BASE_URL.replace(/\/$/, '');
    const relativePath = window.location.pathname.slice(base.length);
    return relativePath === '/blog' || relativePath === '/blog/' || relativePath.startsWith('/blog/');
  };

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.4;
    const onErr = () => setReady(false); // missing placeholder file → hide gracefully
    a.addEventListener('error', onErr);
    return () => a.removeEventListener('error', onErr);
  }, []);

  useEffect(() => {
    // Show popup on initial mount if starting on a blog page
    if (isBlogPage()) {
      setShowPopup(true);
      timerRef.current = window.setTimeout(() => {
        setShowPopup(false);
      }, 5000);
    }

    // Handle view transitions / page navigations
    const handlePageLoad = () => {
      if (isBlogPage()) {
        setShowPopup(true);
        if (timerRef.current) {
          window.clearTimeout(timerRef.current);
        }
        timerRef.current = window.setTimeout(() => {
          setShowPopup(false);
        }, 5000);
      } else {
        setShowPopup(false);
      }
    };

    document.addEventListener('astro:page-load', handlePageLoad);

    return () => {
      document.removeEventListener('astro:page-load', handlePageLoad);
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  async function toggle() {
    const a = audioRef.current;
    if (!a) return;
    try {
      if (a.paused) {
        await a.play();
        setPlaying(true);
      } else {
        a.pause();
        setPlaying(false);
      }
    } catch {
      setReady(false);
    }
  }

  if (!ready) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
      <audio ref={audioRef} src={src} loop preload="none" />

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="absolute bottom-full right-0 mb-3 w-72 rounded-2xl border border-border bg-surface px-4 py-3 shadow-none backdrop-blur-md"
          >
            {/* Cloud tail pointing to the button */}
            <div className="absolute -bottom-[6px] right-12 w-3.5 h-3.5 rotate-45 border-r border-b border-border bg-surface" />

            {/* Close button */}
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-muted hover:text-ink transition-colors p-1"
              aria-label="Close message"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Wording */}
            <p className="text-caption text-ink font-serif leading-relaxed pr-5 select-none">
              Some tunes 🎶 to lock in... by yours truly
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause ${title}` : `Play ${title}`}
        aria-pressed={playing}
        className="flex items-center gap-2 rounded-full border border-border bg-surface/90 px-4 py-2 text-caption text-ink backdrop-blur transition-colors hover:bg-parchment"
      >
        {/* Equalizer bars animate while playing. */}
        <span className="flex h-3.5 items-end gap-[2px]" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-[2px] bg-ink"
              style={{
                height: playing ? '100%' : '40%',
                animation: playing
                  ? `eq 0.9s ${i * 0.15}s ease-in-out infinite alternate`
                  : 'none',
              }}
            />
          ))}
        </span>
        {playing ? 'Pause' : 'Play'} ambience
      </button>

      <style>{`@keyframes eq { from { height: 30%; } to { height: 100%; } }`}</style>
    </div>
  );
}
