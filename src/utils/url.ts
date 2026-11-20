// Prefix a root-relative path with Astro's `base` (set in astro.config.ts).
// The site is served at the root (base "/"), so this is a no-op today; it keeps links
// working if the site is ever moved to a sub-path.
const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export function withBase(path: string): string {
	if (/^[a-z]+:\/\//i.test(path)) return path; // already absolute URL
	return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
