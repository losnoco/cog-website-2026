// Words every page shares: the header, the donate menu and the footer.
// See src/i18n.ts for how `Text` works.

import type { Lang } from "../i18n";

export const common = {
  menu: { en: "Menu", es: "Menú" },
  donate: { en: "Donate", es: "Donar" },
  // The language switcher's label, for screen readers; its visible text is
  // the other language's own name.
  otherLanguage: { en: "Leer en español", es: "Read in English" },
  builtWithAstro: { en: "Built with Astro", es: "Hecho con Astro" },
  /** HTML. */
  footer: (lang: Lang, acknowledgementsHref: string) =>
    ({
      en:
        `&copy; 2021–2026 <a href="https://kode54.net">Christopher Snowhill</a>. ` +
        `<a href="https://cogx.org/">Originally developed</a> by ` +
        `<a href="http://vspader.com/">Vincent Spader</a>. ` +
        `<a href="${acknowledgementsHref}">Acknowledgements</a>.`,
      es:
        `&copy; 2021–2026 <a href="https://kode54.net">Christopher Snowhill</a>. ` +
        `<a href="https://cogx.org/">Desarrollado originalmente</a> por ` +
        `<a href="http://vspader.com/">Vincent Spader</a>. ` +
        `<a href="${acknowledgementsHref}">Agradecimientos</a>.`,
    })[lang],
};

export const DONATE_LINKS = [
  { label: "PayPal", href: "https://paypal.me/kode54" },
  { label: "Patreon", href: "https://patreon.com/kode54" },
  { label: "Ko-fi", href: "https://ko-fi.com/kode54" },
  { label: "LiberaPay", href: "https://liberapay.com/kode54" },
  { label: "GitHub Sponsors", href: "https://github.com/sponsors/kode54" },
];
