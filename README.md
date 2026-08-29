# cog-website-2026

The marketing and download site for [Cog](https://github.com/losnoco/cog), a free and open source audio player for macOS. Deployed at <https://cog.losno.co>.

Built with [Astro](https://astro.build) and [Tailwind CSS v4](https://tailwindcss.com), styled to the [LoSnoCo design system](https://losno.co). The release list and download links are pulled at build time from the Sparkle appcast at `cogcdn.cog.losno.co/mercury.json`.

The `/xpcog` page lists the releases of [XPCog](https://github.com/losnoco/XPCog),
the port of Cog to Windows, macOS and Linux, read at build time from that
repository's GitHub releases API (`src/xpcog_releases.ts`). Only tags shaped
`v<major>.<minor>.<patch>` count as builds — the repository also has a release
that mirrors two encoders for its test fixtures, and that is not a version of
anything.

Because both feeds are read at build time, a new release only reaches the site
when the site is rebuilt. XPCog's release job POSTs to a Netlify build hook for
this project as its last step, so that happens on its own; the hook lives in a
`WEBSITE_BUILD_HOOK` secret on the XPCog repository. Cog's own appcast has no
such wiring and relies on the next deploy.

## Commands

| Command         | Action                                       |
| :-------------- | :------------------------------------------- |
| `bun install`   | Install dependencies                         |
| `bun dev`       | Start dev server at `localhost:4321`         |
| `bun build`     | Build production site to `./dist/`           |
| `bun preview`   | Preview the production build locally         |
