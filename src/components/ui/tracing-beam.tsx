"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useSpring,
} from "framer-motion";
import { cn } from "../../lib/utils";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end 150px"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const update = () => setSvgHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const y1 = useSpring(
    useTransform(scrollYProgress, (value) => {
      const p = Math.min(Math.max(value / 0.8, 0), 1);
      return p * svgHeight;
    }),
    {
      stiffness: 500,
      damping: 90,
    },
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, (value) => {
      const p = Math.min(Math.max(value, 0), 1);
      return p * Math.max(svgHeight - 200, 0);
    }),
    {
      stiffness: 500,
      damping: 90,
    },
  );

  const boxShadow = useTransform(
    scrollYProgress,
    [0, 0.05],
    ["rgba(0, 0, 0, 0.24) 0px 3px 8px", "none"]
  );

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.05],
    ["var(--accent)", "var(--canvas)"]
  );

  const borderColor = useTransform(
    scrollYProgress,
    [0, 0.05],
    ["var(--accent)", "var(--canvas)"]
  );

  return (
    <motion.div
      ref={ref}
      className={cn("relative mx-auto h-full w-full max-w-4xl px-8", className)}
    >
      <div className="pointer-events-none absolute top-3 -left-4 md:-left-12 lg:-left-20" aria-hidden="true">
        <motion.div
          style={{
            y: y2,
            boxShadow: boxShadow,
          }}
          className="ml-[9px] flex h-4 w-4 items-center justify-center rounded-full border border-border bg-canvas shadow-sm"
        >
          <motion.div
            style={{
              backgroundColor: backgroundColor,
              borderColor: borderColor,
            }}
            className="h-2 w-2 rounded-full border border-border"
          />
        </motion.div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-4 block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 1 0 V ${svgHeight}`}
            fill="none"
            stroke="var(--border)"
            strokeOpacity="0.25"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <motion.path
            d={`M 1 0 V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.5"
            className="motion-reduce:hidden"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop offset="0" stopColor="var(--accent)" stopOpacity="0"></stop>
              <stop offset="0.1" stopColor="var(--accent)" stopOpacity="1"></stop>
              <stop offset="0.325" stopColor="var(--accent)" stopOpacity="1"></stop>
              <stop offset="1" stopColor="var(--accent)" stopOpacity="0"></stop>
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
