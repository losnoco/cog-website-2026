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
  /** The release notes as `<li>` items, in English. */
  notesHtml: string;
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
        notesHtml: item.Description.replace(/^[•·]\s*/gm, ""),
      })),
    )
    .catch((error) => {
      // Not cached, so that the dev server retries on the next request.
      releases = undefined;
      throw error;
    });
  return releases;
}
