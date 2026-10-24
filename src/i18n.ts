/**
 * The site in two languages, built from one layout.
 *
 * Every page is a view in src/views/ that takes a `lang`, and src/pages/ only
 * mounts each view twice: once at its English path and once under /es/. The
 * words live in src/strings/, where each one is a `Text` — either a plain
 * string, which reads the same in both languages (a format name, a product
 * name), or `{ en, es }`, kept side by side so that changing one makes the
 * other impossible to miss. TypeScript refuses a `{ en }` without its `es`.
 *
 * The Spanish follows the Cog apps' own catalogues (Cog's *.xcstrings, and
 * XPCog's uicore/locale/es.po for XPCog's page): Chilean usage and the
 * informal "tú" — playlist, pista, carátula, letras, analizador, vúmetro,
 * audífonos, parlantes, inspector de información, inspector de señal.
 *
 * What comes from the feeds — Cog's appcast notes, XPCog's GitHub release
 * notes — is written in English and stays English on the Spanish pages,
 * marked `lang="en"`.
 */

import { filesize } from "filesize";
import { DateTime } from "luxon";

export const LANGS = ["en", "es"] as const;
export type Lang = (typeof LANGS)[number];

export type Text = string | Record<Lang, string>;

export const t = (text: Text, lang: Lang): string =>
  typeof text === "string" ? text : text[lang];

/** A list entry, for the feature and format lists. Text may hold HTML. */
export interface Item {
  text: Text;
  children?: Item[];
}

/** BCP 47 tags for dates and sizes; es-CL, as the apps' Spanish is Chilean. */
const LOCALES: Record<Lang, string> = { en: "en-US", es: "es-CL" };

/** The language's own name, for the switcher. */
export const LANG_NAMES: Record<Lang, string> = {
  en: "English",
  es: "Español",
};

/**
 * A page's path in a language. `path` is the English one: "/", "/xpcog".
 * Spanish lives under /es/ with the same slugs.
 */
export const localePath = (lang: Lang, path: string): string =>
  lang === "en" ? path : path === "/" ? "/es/" : "/es" + path;

export const formatDate = (date: DateTime, lang: Lang): string =>
  date.setLocale(LOCALES[lang]).toLocaleString(DateTime.DATETIME_MED);

export const formatSize = (bytes: number, lang: Lang): string =>
  filesize(bytes, { locale: LOCALES[lang] });
