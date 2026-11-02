/**
 * Cog's release list, read at build time from the Sparkle appcast.
 *
 * Fetched once per build and shared: the English and the Spanish home pages
 * both render from it.
 */

import { DateTime } from "luxon";

interface CogFeedItem {
  Title: string;
  PubDate: string; // fmt like Sun, 08 Feb 2026 19:25:48 -0800
  Version: string;
  ShortVersionString: string;
  Description: string;
  MinimumSystemVersion: string;
  Enclosure: Enclosure;
  ReleaseNotesLink: string;
}

interface Enclosure {
  URL: string;
  Length: string;
  Type: string;
  EdSignature: string;
}

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

function notesFragment(description: string): string {
  const html = description.replace(/^[•·]\s*/gm, "").trim();
  return html.startsWith("<li")
    ? `<ul class="commit-list">${html}</ul>`
    : html;
}

let releases: Promise<CogRelease[]> | undefined;

/** Every Mac release in the appcast, newest first. */
export function fetchCogReleases(): Promise<CogRelease[]> {
  releases ??= fetch("https://cogcdn.cog.losno.co/mercury.json")
    .then((r) => r.json())
    .then((feed: CogFeedItem[]) =>
      feed.map((item) => ({
        version: item.Version,
        url: item.Enclosure.URL,
        size: parseInt(item.Enclosure.Length),
        published: DateTime.fromRFC2822(item.PubDate),
        minimumSystemVersion: item.MinimumSystemVersion,
        notesHtml: notesFragment(item.Description),
      })),
    )
    .catch((error) => {
      // Not cached, so that the dev server retries on the next request.
      releases = undefined;
      throw error;
    });
  return releases;
}
