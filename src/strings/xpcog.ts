// The XPCog page's words. See src/i18n.ts for how `Text` works; strings that
// hold links or markup are HTML. The Spanish follows XPCog's own catalogue,
// uicore/locale/es.po in the XPCog repository.

const AUR = "https://aur.archlinux.org/packages/xpcog";
const AUR_INCIDENT =
  "https://archlinux.org/news/active-aur-malicious-packages-incident/";
const REPO = "https://github.com/losnoco/XPCog";

export const xpcog = {
  title: {
    en: "XPCog — Cog for Windows and Linux",
    es: "XPCog — Cog para Windows y Linux",
  },
  description: {
    en: "XPCog is a port of Cog to Windows and Linux. Downloads for every release.",
    es: "XPCog es una adaptación de Cog para Windows y Linux. Descargas de todas las versiones.",
  },

  nav: {
    cog: { en: "Cog for Mac and iOS", es: "Cog para Mac e iOS" },
    releases: { en: "Releases", es: "Versiones" },
  },

  hero: {
    label: {
      en: "Audio Player for Windows and Linux",
      es: "Reproductor de audio para Windows y Linux",
    },
    title: {
      en: "Cog, for Windows and Linux.",
      es: "Cog, para Windows y Linux.",
    },
    /** HTML. */
    intro: {
      en:
        `XPCog is <a href="${REPO}">a port of Cog</a> in C++20 — a native WinUI 3 app on Windows, ` +
        "a native GNOME app in GTK 4 and libadwaita on Linux, and the same decoders, the same " +
        "gapless engine, the same settings keys on both. It is early, and every build below is " +
        "what CI published on the day it says.",
      es:
        `XPCog es <a href="${REPO}">una adaptación de Cog</a> en C++20: una app nativa en WinUI 3 en Windows, ` +
        "una app nativa de GNOME en GTK 4 y libadwaita en Linux, y los mismos decodificadores, el mismo " +
        "motor sin silencios entre pistas y las mismas claves de configuración en ambos. Está en una " +
        "etapa temprana, y cada compilación de abajo es lo que la CI publicó el día que indica.",
    },
    meta: {
      en: (version: string, date: string) =>
        `Version ${version} · Published ${date} · `,
      es: (version: string, date: string) =>
        `Versión ${version} · Publicada el ${date} · `,
    },
    releaseOnGitHub: { en: "Release on GitHub", es: "La versión en GitHub" },
    /** HTML. `cogHref` is the home page in the same language. */
    requirements: {
      en: (cogHref: string) =>
        "<strong>Windows</strong> 10 version 1809 or later, 64-bit; the installer fetches " +
        "Microsoft's Windows App Runtime if it is missing. " +
        "<strong>Linux</strong> x86_64, with GTK 4.22 and libadwaita 1.9 or newer from your " +
        "distribution — Ubuntu 26.04, Fedora 44, Arch, or anything on GNOME 50 or later. " +
        `No macOS build: on a Mac, <a href="${cogHref}">Cog itself</a> is the player.`,
      es: (cogHref: string) =>
        "<strong>Windows</strong> 10 versión 1809 o posterior, de 64 bits; el instalador " +
        "descarga el Windows App Runtime de Microsoft si falta. " +
        "<strong>Linux</strong> x86_64, con GTK 4.22 y libadwaita 1.9 o posterior de tu " +
        "distribución: Ubuntu 26.04, Fedora 44, Arch o cualquiera con GNOME 50 o posterior. " +
        `No hay versión para macOS: en un Mac, el reproductor es <a href="${cogHref}">el propio Cog</a>.`,
    },
    /** HTML. */
    aur: {
      en:
        `On Arch Linux, build it from the AUR instead: <a href="${AUR}">xpcog</a> — ` +
        "<code>yay -S xpcog</code>. It builds a tagged release from source, so it can trail " +
        "the newest one above. <strong>Read the PKGBUILD before you build it.</strong> The AUR " +
        `is user-submitted, and has repeatedly been used to <a href="${AUR_INCIDENT}">ship malware</a> ` +
        "through hijacked orphan packages — nothing on it is vetted for you, this package included.",
      es:
        `En Arch Linux, compílalo desde el AUR: <a href="${AUR}">xpcog</a> — ` +
        "<code>yay -S xpcog</code>. Compila una versión etiquetada desde el código fuente, así que " +
        "puede ir por detrás de la más reciente de arriba. <strong>Lee el PKGBUILD antes de " +
        "compilarlo.</strong> El AUR lo suben sus usuarios, y se ha usado una y otra vez para " +
        `<a href="${AUR_INCIDENT}">distribuir malware</a> mediante paquetes huérfanos secuestrados: ` +
        "nadie revisa nada de lo que hay ahí por ti, tampoco este paquete.",
    },
    older: { en: "Older versions ↓", es: "Versiones anteriores ↓" },
    /** HTML. */
    none: {
      en:
        "No release has been published yet. Builds appear here as soon as one is — until " +
        `then, the source is on <a href="${REPO}">GitHub</a>, and Arch Linux users can build ` +
        `it from <a href="${AUR}">the AUR</a> — read the PKGBUILD before you do.`,
      es:
        "Aún no se ha publicado ninguna versión. Las compilaciones aparecen aquí en cuanto se " +
        `publica una; mientras tanto, el código fuente está en <a href="${REPO}">GitHub</a>, y en ` +
        `Arch Linux puedes compilarlo desde <a href="${AUR}">el AUR</a> (lee el PKGBUILD antes).`,
    },
  },

  // Only the Spanish page says so: the notes come from GitHub as written.
  notesInEnglish: { en: "", es: "Notas de la versión en inglés." },

  releases: {
    label: { en: "Archive", es: "Archivo" },
    older: { en: "Older versions", es: "Versiones anteriores" },
    all: { en: "All releases", es: "Todas las versiones" },
    nothingOlder: {
      en: "Nothing older than the build above yet.",
      es: "Todavía no hay nada anterior a la compilación de arriba.",
    },
    nothing: { en: "Nothing published yet.", es: "Aún no se ha publicado nada." },
  },
};
