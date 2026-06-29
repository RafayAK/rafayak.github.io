import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  videoUrl?: string;
  posterUrl?: string;
  tags?: string[];
  githubUrl?: string;
  liveUrl?: string;
  expandedContent?: string[];
}

const parseMarkdownLinks = (text: string) => {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const [_, linkText, linkUrl] = match;
    const matchIndex = match.index;

    if (matchIndex > lastIndex) {
      parts.push(text.slice(lastIndex, matchIndex));
    }

    parts.push(
      <a
        key={matchIndex}
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:underline underline-offset-4 transition-colors duration-300 font-medium"
        onClick={(e) => e.stopPropagation()}
      >
        {linkText}
      </a>
    );

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  videoUrl,
  posterUrl,
  tags = [],
  githubUrl,
  liveUrl,
  expandedContent = [],
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseEnter = () => {
    if (videoUrl) {
      if (videoRef.current) {
        videoRef.current.play().catch((err) => console.log("Video play failed:", err));
      }
      if (bgVideoRef.current) {
        bgVideoRef.current.play().catch((err) => console.log("Background video play failed:", err));
      }
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (videoUrl) {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      if (bgVideoRef.current) {
        bgVideoRef.current.pause();
        bgVideoRef.current.currentTime = 0;
      }
      setIsPlaying(false);
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoUrl) return;

    if (isPlaying) {
      if (videoRef.current) videoRef.current.pause();
      if (bgVideoRef.current) bgVideoRef.current.pause();
      setIsPlaying(false);
    } else {
      if (videoRef.current) {
        videoRef.current.play().catch((err) => console.log("Video play failed:", err));
      }
      if (bgVideoRef.current) {
        bgVideoRef.current.play().catch((err) => console.log("Background video play failed:", err));
      }
      setIsPlaying(true);
    }
  };

  const primaryLink = liveUrl || githubUrl;

  return (
    <>
      <article
        tabIndex={0}
        className="group bg-surface border border-border rounded-2xl overflow-hidden flex flex-col transition-all duration-500 hover:border-accent cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
        onClick={() => setIsModalOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsModalOpen(true);
          }
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Video / Visual container */}
        <div className="relative w-full aspect-video bg-parchment overflow-hidden border-b border-border transition-colors duration-500 flex items-center justify-center">
          {videoUrl ? (
            <>
              {/* Blurred background video to fill varying aspect ratios without cropping */}
              <video
                ref={bgVideoRef}
                src={videoUrl}
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover filter blur-xl opacity-35 dark:opacity-20 scale-110 pointer-events-none transition-all duration-700 ease-out"
              />
              
              {/* Crisp foreground video displayed in its natural aspect ratio without zooming or cropping */}
              <video
                ref={videoRef}
                src={videoUrl}
                loop
                muted
                playsInline
                className="relative z-10 max-w-full max-h-full object-contain transition-all duration-700 ease-out group-hover:scale-105"
              />
              
              {/* Warm overlay that fades out on hover */}
              <div className="absolute inset-0 bg-ink/5 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-300 pointer-events-none z-15" />
              
              {/* Play/Pause Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay(e);
                }}
                aria-label={isPlaying ? "Pause video" : "Play video"}
                className="absolute top-3 right-3 z-20 bg-surface/85 backdrop-blur-sm border border-border rounded-full p-2 text-ink opacity-80 group-hover:opacity-100 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {isPlaying ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3.5 h-3.5 animate-pulse"
                  >
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3.5 h-3.5"
                  >
                    <polygon points="6 3 20 12 6 21 6 3" />
                  </svg>
                )}
              </button>
            </>
          ) : posterUrl ? (
            <>
              {/* Blurred background image to fill varying aspect ratios without cropping */}
              <img
                src={posterUrl}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover filter blur-xl opacity-35 dark:opacity-20 scale-110 pointer-events-none transition-all duration-700 ease-out"
              />
              
              {/* Crisp foreground image displayed in its natural aspect ratio without zooming or cropping */}
              <img
                src={posterUrl}
                alt={title}
                className="relative z-10 max-w-full max-h-full object-contain transition-all duration-700 ease-out group-hover:scale-105"
              />
              
              {/* Warm overlay that fades out on hover */}
              <div className="absolute inset-0 bg-ink/5 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-300 pointer-events-none z-15" />
            </>
          ) : (
            <div className="grid h-full w-full place-items-center text-caption text-faint font-serif">
              demo video coming soon
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-serif font-semibold text-ink group-hover:text-accent transition-colors duration-300">
              {title}
            </h3>
            <p className="text-sm text-muted leading-relaxed line-clamp-3 transition-colors duration-500">
              {description}
            </p>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2.5 py-1 bg-parchment text-muted border border-border rounded-md transition-colors duration-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}


        </div>
      </article>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with blur & light transparent wash */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-canvas/70 backdrop-blur-md dark:bg-canvas/80"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative z-10 w-full max-w-2xl bg-surface border border-border rounded-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Close Button "X" */}
              <button
                onClick={() => setIsModalOpen(false)}
                aria-label="Close dialog"
                className="absolute top-4 right-4 z-30 p-2 rounded-full border border-border bg-surface text-ink hover:text-accent hover:border-accent transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div className="overflow-y-auto flex-grow">
                {/* Visual Area (full video controls) */}
                <div className="relative w-full aspect-video bg-parchment border-b border-border flex items-center justify-center">
                  {videoUrl ? (
                    <video
                      src={videoUrl}
                      poster={posterUrl}
                      controls
                      autoPlay
                      playsInline
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : posterUrl ? (
                    <img
                      src={posterUrl}
                      alt={title}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="text-caption text-faint font-serif">
                      No preview media available
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-6 md:p-8 flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    {/* Tags */}
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-mono px-2.5 py-1 bg-parchment text-muted border border-border rounded-md transition-colors duration-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h3 className="text-2xl md:text-3xl font-serif font-semibold text-ink">
                      {title}
                    </h3>
                  </div>

                  <p className="text-body text-ink leading-relaxed font-serif italic border-l-2 border-border pl-4">
                    {description}
                  </p>

                  {/* Expanded Content List */}
                  {expandedContent && expandedContent.length > 0 && (
                    <div className="flex flex-col gap-3 border-t border-border/50 pt-4">
                      <h4 className="text-caption uppercase tracking-wider text-muted font-semibold">
                        Key Accomplishments & Focus Areas
                      </h4>
                      <ul className="list-disc pl-5 space-y-2 text-sm text-ink leading-relaxed">
                        {expandedContent.map((item, idx) => (
                          <li key={idx}>{parseMarkdownLinks(item)}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>


            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;
