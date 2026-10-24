# cog-website-2026

The marketing and download site for [Cog](https://github.com/losnoco/cog), a free and open source audio player for macOS and iOS/iPadOS. Deployed at <https://cog.losno.co>.

Built with [Astro](https://astro.build) and [Tailwind CSS v4](https://tailwindcss.com), styled to the [LoSnoCo design system](https://losno.co). The release list and download links are pulled at build time from the Sparkle appcast at `cogcdn.cog.losno.co/mercury.json`.

The `/xpcog` page lists the releases of [XPCog](https://github.com/losnoco/XPCog),
the port of Cog to Windows and Linux, read at build time from that
repository's GitHub releases API (`src/xpcog_releases.ts`). Only tags shaped
`v<major>.<minor>.<patch>` count as builds — the repository also has a release
that mirrors two encoders for its test fixtures, and that is not a version of
anything.

Because both feeds are read at build time, a new release only reaches the site
when the site is rebuilt. XPCog's release job POSTs to a Netlify build hook for
this project as its last step, so that happens on its own; the hook lives in a
`WEBSITE_BUILD_HOOK` secret on the XPCog repository. Cog's own appcast has no
such wiring and relies on the next deploy.

## Languages

The site is in English and Spanish (under `/es/`, same slugs), built from one
layout. Each page is a view in `src/views/` that takes a `lang`;
`src/pages/` and `src/pages/es/` only mount it. `src/layouts/Base.astro`
holds the head, the nav with its language switcher, and the footer.

The words live in `src/strings/` (and the credit descriptions in
`src/acknowledgements.ts`), with each string's English and Spanish side by
side as `{ en, es }`. A plain string reads the same in both. So a change to
the layout reaches both languages on its own, and a change to the text means
editing the `es` next to the `en` you just touched — TypeScript rejects a
`{ en }` without its `es`. See `src/i18n.ts`.

The Spanish follows the apps' own catalogues: Cog's `*.xcstrings` and
XPCog's `uicore/locale/es.po` (Chilean usage, "tú": playlist, pista,
carátula, analizador, vúmetro, audífonos, parlantes). Release notes come
from the feeds in English and stay English on the Spanish pages.

Browsers whose first language is Spanish are sent to `/es/` by Netlify
(`public/_redirects`). The nav's language switcher sets an `nf_lang` cookie,
which Netlify honours over the browser's language, so picking English sticks.
A new page needs its line in `_redirects` too.

## Commands

| Command         | Action                                       |
| :-------------- | :------------------------------------------- |
| `bun install`   | Install dependencies                         |
| `bun dev`       | Start dev server at `localhost:4321`         |
| `bun build`     | Build production site to `./dist/`           |
| `bun preview`   | Preview the production build locally         |
