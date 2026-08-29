/**
 * The XPCog release list, read from GitHub at build time.
 *
 * Cog's downloads come from a Sparkle appcast. XPCog has none: its CI publishes
 * one GitHub release per version bump, with the Windows installer and the macOS
 * disk image attached, so the releases API is the feed. Because this is read at
 * build time and not in the browser, a new XPCog release only reaches the site
 * when the site is rebuilt — which is what the Netlify build hook XPCog's
 * release job calls is for. See the README.
 */

import { filesize } from "filesize";
import { DateTime } from "luxon";
import { createMarkdownProcessor } from "@astrojs/markdown-remark";

const REPO = "losnoco/XPCog";

/**
 * Releases whose tag is not `v<major>.<minor>.<patch>` are not builds of the
 * player. The repository keeps at least one that is not — `ci-encoders-1`,
 * which mirrors two command-line encoders the test fixtures need — and it would
 * otherwise show up here as a version nobody can install.
 */
const VERSION_TAG = /^v(\d+\.\d+\.\d+)$/;

export type Platform = "windows" | "macos" | "linux";

/** Extension → platform. The installer names carry nothing else to go on. */
const PLATFORMS: { suffix: string; platform: Platform; label: string }[] = [
  { suffix: ".exe", platform: "windows", label: "Windows" },
  { suffix: ".dmg", platform: "macos", label: "macOS" },
  { suffix: ".appimage", platform: "linux", label: "Linux" },
  { suffix: ".deb", platform: "linux", label: "Linux" },
];

/** The order downloads are offered in, whichever order GitHub lists them. */
const PLATFORM_ORDER: Platform[] = ["windows", "macos", "linux"];

export interface ReleaseAsset {
  name: string;
  url: string;
  /** Bytes, as GitHub reports them. */
  size: number;
  /** Same, for humans: "27.23 MB". */
  sizeLabel: string;
  platform: Platform;
  platformLabel: string;
}

export interface Release {
  /** "0.7.2" — the tag with its leading `v` removed. */
  version: string;
  /** "v0.7.2". */
  tag: string;
  /** The release page on GitHub. */
  url: string;
  publishedISO: string;
  /** Localised, e.g. "Aug 29, 2026, 8:17 PM". */
  publishedLabel: string;
  /** The release notes, rendered from Markdown. Empty when there are none. */
  notesHtml: string;
  /** Installer assets, one per platform, in PLATFORM_ORDER. */
  downloads: ReleaseAsset[];
}

interface GitHubAsset {
  name: string;
  browser_download_url: string;
  size: number;
}

interface GitHubRelease {
  tag_name: string;
  html_url: string;
  published_at: string | null;
  created_at: string;
  body: string | null;
  draft: boolean;
  assets: GitHubAsset[];
}

function classify(asset: GitHubAsset): ReleaseAsset | null {
  const name = asset.name.toLowerCase();
  const match = PLATFORMS.find((p) => name.endsWith(p.suffix));
  if (!match) return null;

  return {
    name: asset.name,
    url: asset.browser_download_url,
    size: asset.size,
    sizeLabel: filesize(asset.size),
    platform: match.platform,
    platformLabel: match.label,
  };
}

/**
 * Every published version of XPCog, newest first.
 *
 * Throws rather than returning an empty list when GitHub says no: the API is
 * rate-limited to 60 requests an hour per IP for anonymous callers, and a
 * build host is not the only thing on its IP. A build that fails is one
 * somebody retries; a build that quietly ships a downloads page with no
 * downloads on it is not.
 */
export async function fetchReleases(): Promise<Release[]> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    // GitHub rejects requests to the API without one.
    "User-Agent": "cog-website-2026",
  };

  // Netlify does not set this; it is here so a local build, or a CI job that
  // has a token, spends that token's rate limit instead of the shared one.
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(
    `https://api.github.com/repos/${REPO}/releases?per_page=100`,
    { headers },
  );

  if (!response.ok) {
    const detail = (await response.text()).slice(0, 500);
    throw new Error(
      `GitHub returned ${response.status} ${response.statusText} for the ` +
        `${REPO} releases: ${detail}`,
    );
  }

  const raw: GitHubRelease[] = await response.json();

  const processor = await createMarkdownProcessor({ gfm: true });

  const releases = await Promise.all(
    raw
      // Drafts come back only for a caller with write access, so this matters
      // exactly when GITHUB_TOKEN is set — which is when a local build would
      // otherwise show an unpublished release.
      .filter((item) => !item.draft && VERSION_TAG.test(item.tag_name))
      .map(async (item): Promise<Release> => {
        const published = item.published_at ?? item.created_at;
        const downloads = item.assets
          .map(classify)
          .filter((a): a is ReleaseAsset => a !== null)
          .sort(
            (a, b) =>
              PLATFORM_ORDER.indexOf(a.platform) -
              PLATFORM_ORDER.indexOf(b.platform),
          );

        const body = item.body?.trim();

        return {
          version: item.tag_name.replace(/^v/, ""),
          tag: item.tag_name,
          url: item.html_url,
          publishedISO: published,
          publishedLabel: DateTime.fromISO(published).toLocaleString(
            DateTime.DATETIME_MED,
          ),
          notesHtml: body ? (await processor.render(body)).code : "",
          downloads,
        };
      }),
  );

  // GitHub orders by creation, which is the tag's date and not the release's.
  // They agree here because CI tags and publishes in one step, but sorting on
  // what the page actually shows keeps them from ever disagreeing.
  return releases.sort((a, b) =>
    b.publishedISO.localeCompare(a.publishedISO),
  );
}
