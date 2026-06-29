import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Tailwind-aware className combiner. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Prefix an internal path with the configured Astro `base`, so links keep
 * working whether the site is served from `/` or `/rafayak.github.com/`.
 */
export function href(path = '/') {
  const base = import.meta.env.BASE_URL; // e.g. '/' or '/rafayak.github.com/'
  return (`${base}/${path}`).replace(/\/{2,}/g, '/');
}

/** Format a Date as e.g. "27 Jun 2026". */
export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}
