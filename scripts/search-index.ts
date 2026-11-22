// Builds the Pagefind search index after `astro build` (run by the `postbuild` script).
// Indexes blog posts and notes from dist/, plus one record per project from src/data/projects.ts,
// so a search like "poker" returns the project itself instead of the homepage.
// Run with plain Node (type stripping), so only erasable TypeScript here.
import { globSync, readFileSync } from "node:fs";
import { relative } from "node:path";
import * as pagefind from "pagefind";
import { projects } from "../src/data/projects.ts";
import { siteConfig } from "../src/site.config.ts";

const SITE_DIR = "dist";
// Must match <html lang>, otherwise the projects land in a separate index the search UI doesn't load.
const LANGUAGE = siteConfig.lang.toLowerCase();

function fail(step: string, errors: string[]): never {
	console.error(`Pagefind ${step} failed:\n${errors.join("\n")}`);
	process.exit(1);
}

const { index, errors } = await pagefind.createIndex();
if (!index) fail("createIndex", errors);

// Only pages that opt in with data-pagefind-body (single posts and notes). Listing pages, tags and
// the homepage stay out; the homepage's projects are covered by the records below.
let pageCount = 0;
for (const file of globSync(`${SITE_DIR}/**/*.html`)) {
	const content = readFileSync(file, "utf8");
	if (!content.includes("data-pagefind-body")) continue;
	const page = await index.addHTMLFile({ sourcePath: relative(SITE_DIR, file), content });
	if (page.errors.length) fail(`addHTMLFile (${file})`, page.errors);
	pageCount++;
}

for (const p of projects) {
	const record = await index.addCustomRecord({
		url: new URL(p.url).pathname,
		content: `${p.title}. ${p.description}`,
		language: LANGUAGE,
		meta: { title: p.title },
	});
	if (record.errors.length) fail(`addCustomRecord (${p.title})`, record.errors);
}

const written = await index.writeFiles({ outputPath: `${SITE_DIR}/pagefind` });
if (written.errors.length) fail("writeFiles", written.errors);

console.log(`Pagefind: indexed ${pageCount} pages and ${projects.length} projects`);
await pagefind.close();
