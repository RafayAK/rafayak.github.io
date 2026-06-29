import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  /** Target company/site URL. */
  url: string;
  /** Visible inline text (the company name). */
  children: React.ReactNode;
  /**
   * Optional static preview image. If omitted, a screenshot is requested from
   * microlink.io at runtime. Provide a local image to stay fully self-contained.
   */
  imageSrc?: string;
  width?: number;
  height?: number;
  /** Optional tilt direction for hover popup. */
  tilt?: 'left' | 'right';
  /** Optional object-fit strategy for the image. Defaults to 'cover'. */
  objectFit?: 'cover' | 'contain';
};

/**
 * Hover link preview (after aceternity.com/components/link-preview).
 * Used for the companies and locations named in the profile summary.
 */
export default function LinkPreview({
  url,
  children,
  imageSrc,
  width = 150,
  height = 80,
  tilt,
  objectFit = 'cover',
}: Props) {
  const [open, setOpen] = useState(false);

  const src =
    imageSrc ??
    `https://api.microlink.io/?url=${encodeURIComponent(
      url,
    )}&screenshot=true&meta=false&embed=screenshot.url&colorScheme=light&viewport.width=900&viewport.height=560`;

  // Calculate tilt angle based on the prop
  const tiltAngle = tilt === 'left' ? -4 : tilt === 'right' ? 4 : 0;

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium underline decoration-border decoration-1 underline-offset-4 hover:decoration-accent transition-colors duration-300"
      >
        {children}
      </a>

      <AnimatePresence>
        {open && (
          <motion.span
            initial={{ opacity: 0, y: 12, scale: 0.85, rotate: 0 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1, 
              rotate: tiltAngle 
            }}
            exit={{ opacity: 0, y: 8, scale: 0.9, rotate: 0 }}
            transition={{ 
              type: 'spring', 
              stiffness: 350, 
              damping: 14 // lower damping creates a premium springy wobble/bounce
            }}
            className="absolute bottom-full left-1/2 z-50 mb-3 -translate-x-1/2"
            style={{ pointerEvents: 'none' }}
          >
            <span 
              className="block overflow-hidden rounded-[12px] border border-border bg-surface p-1"
              style={{ width: `${width}px` }}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="block rounded-[8px]"
                style={{ width: '100%', height: `${height}px`, objectFit }}
              />
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
