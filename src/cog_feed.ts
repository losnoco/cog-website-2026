/**
 * Cog's release list, read at build time from the Sparkle appcast.
 *
 * Fetched once per build and shared: the English and the Spanish home pages
 * both render from it.
 */

import { XMLParser } from "fast-xml-parser";
import { DateTime } from "luxon";
import type { Lang } from "./i18n";

const APPCAST_URL = "https://cogcdn.cog.losno.co/mercury.xml";

/**
 * A `<sparkle:releaseNotesLink>`: a bare string when unmarked, an object when
 * it carries `xml:lang`.
 */
type NotesLink = string | { "#text": string; "@_xml:lang"?: string };

/** One `<item>` of the appcast, as fast-xml-parser hands it back. */
interface AppcastItem {
  title: string;
  pubDate: string; // fmt like Sun, 08 Feb 2026 19:25:48 -0800
  "sparkle:version": string;
  "sparkle:minimumSystemVersion": string;
  /** HTML, from a CDATA section. Only builds up to 3868 have one. */
  description?: string;
  /**
   * Linked notes pages, used when there's no description: one unmarked
   * English page for 2402 and 2395, and from the build after 3868 an unmarked
   * English page plus `xml:lang="en"` and `xml:lang="es"` ones. The URLs may
   * be relative to the appcast.
   */
  "sparkle:releaseNotesLink"?: NotesLink[];
  /**
   * The full build. The delta updates' `<enclosure>`s sit one level down,
   * under `sparkle:deltas`, so they never land here.
   */
  enclosure: { "@_url": string; "@_length": string };
}

const parser = new XMLParser({
  ignoreAttributes: false,
  // Keep versions like "3868" and "12.0" as strings.
  parseTagValue: false,
  // Even an appcast with a single release, or an item with a single notes
  // link, yields an array.
  isArray: (_tag, jPath) =>
    jPath === "rss.channel.item" ||
    jPath === "rss.channel.item.sparkle:releaseNotesLink",
});

export interface CogRelease {
  version: string;
  url: string;
  /** Bytes. */
  size: number;
  published: DateTime;
  minimumSystemVersion: string;
  /**
   * The release notes as HTML fragments: always in English, and in Spanish
   * from the build after 3868 on. Releases up to 3857 list commits as bare
   * `<li>` items, which are wrapped here in `<ul class="commit-list">`; newer
   * ones are a summary `<p>`, then `<h3>` sections with their own `<ul>`.
   */
  notes: { en: string; es?: string };
}

/** The notes to show on a page in `lang`, and the language they're in. */
export function notesFor(
  release: CogRelease,
  lang: Lang,
): { html: string; lang: Lang } {
  return lang === "es" && release.notes.es
    ? { html: release.notes.es, lang: "es" }
    : { html: release.notes.en, lang: "en" };
}

const resolve = (url: string) => new URL(url, APPCAST_URL).href;

async function fetchText(url: string): Promise<string> {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`);
  return r.text();
}

/** What's inside `<body>` when the notes are a whole page. */
const bodyOf = (html: string) =>
  html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? html;

function notesFragment(html: string): string {
  html = bodyOf(html).replace(/^[•·]\s*/gm, "").trim();
  return html.startsWith("<li")
    ? `<ul class="commit-list">${html}</ul>`
    : html;
}

async function notesOf(item: AppcastItem): Promise<CogRelease["notes"]> {
  if (item.description) return { en: notesFragment(item.description) };

  const links = new Map<string, string>(); // xml:lang ("" if unmarked) → URL
  for (const link of item["sparkle:releaseNotesLink"] ?? []) {
    if (typeof link === "string") links.set("", resolve(link));
    else links.set(link["@_xml:lang"] ?? "", resolve(link["#text"]));
  }
  const en = links.get("en") ?? links.get("");
  const es = links.get("es");
  return {
    en: en ? notesFragment(await fetchText(en)) : "",
    es: es ? notesFragment(await fetchText(es)) : undefined,
  };
}

let releases: Promise<CogRelease[]> | undefined;

/** Every Mac release in the appcast, newest first. */
export function fetchCogReleases(): Promise<CogRelease[]> {
  releases ??= fetchText(APPCAST_URL)
    .then((xml) => {
      const items: AppcastItem[] = parser.parse(xml).rss.channel.item ?? [];
      return Promise.all(
        items.map(async (item) => ({
          version: item["sparkle:version"],
          url: resolve(item.enclosure["@_url"]),
          size: parseInt(item.enclosure["@_length"]),
          published: DateTime.fromRFC2822(item.pubDate),
          minimumSystemVersion: item["sparkle:minimumSystemVersion"],
          notes: await notesOf(item),
        })),
      );
    })
    .catch((error) => {
      // Not cached, so that the dev server retries on the next request.
      releases = undefined;
      throw error;
    });
  return releases;
}
