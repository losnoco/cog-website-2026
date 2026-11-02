/**
 * Cog's release list, read at build time from the Sparkle appcast.
 *
 * Fetched once per build and shared: the English and the Spanish home pages
 * both render from it.
 */

import { XMLParser } from "fast-xml-parser";
import { DateTime } from "luxon";

const APPCAST_URL = "https://cogcdn.cog.losno.co/mercury.xml";

/** One `<item>` of the appcast, as fast-xml-parser hands it back. */
interface AppcastItem {
  title: string;
  pubDate: string; // fmt like Sun, 08 Feb 2026 19:25:48 -0800
  "sparkle:version": string;
  "sparkle:minimumSystemVersion": string;
  /** HTML, from a CDATA section. */
  description?: string;
  /** Older releases point at a separate HTML page instead of a description. */
  "sparkle:releaseNotesLink"?: string;
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
  // Even an appcast with a single release yields an array.
  isArray: (_tag, jPath) => jPath === "rss.channel.item",
});

export interface CogRelease {
  version: string;
  url: string;
  /** Bytes. */
  size: number;
  published: DateTime;
  minimumSystemVersion: string;
  /**
   * The release notes as an HTML fragment, in English. Releases up to 3857
   * list commits as bare `<li>` items, which are wrapped here in
   * `<ul class="commit-list">`; from 3868 on the appcast sends a whole
   * fragment (a summary `<p>`, then `<h3>` sections with their own `<ul>`).
   */
  notesHtml: string;
}

async function notesOf(item: AppcastItem): Promise<string> {
  if (item.description) return item.description;
  const link = item["sparkle:releaseNotesLink"];
  if (!link) return "";
  const r = await fetch(link);
  if (!r.ok) throw new Error(`${link}: HTTP ${r.status}`);
  return r.text();
}

function notesFragment(description: string): string {
  const html = description.replace(/^[•·]\s*/gm, "").trim();
  return html.startsWith("<li")
    ? `<ul class="commit-list">${html}</ul>`
    : html;
}

let releases: Promise<CogRelease[]> | undefined;

/** Every Mac release in the appcast, newest first. */
export function fetchCogReleases(): Promise<CogRelease[]> {
  releases ??= fetch(APPCAST_URL)
    .then((r) => {
      if (!r.ok) throw new Error(`${APPCAST_URL}: HTTP ${r.status}`);
      return r.text();
    })
    .then((xml) => {
      const items: AppcastItem[] = parser.parse(xml).rss.channel.item ?? [];
      return Promise.all(
        items.map(async (item) => ({
          version: item["sparkle:version"],
          url: item.enclosure["@_url"],
          size: parseInt(item.enclosure["@_length"]),
          published: DateTime.fromRFC2822(item.pubDate),
          minimumSystemVersion: item["sparkle:minimumSystemVersion"],
          notesHtml: notesFragment(await notesOf(item)),
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
