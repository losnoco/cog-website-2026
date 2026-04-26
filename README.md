# cog-website-2026

The marketing and download site for [Cog](https://github.com/losnoco/cog), a free and open source audio player for macOS. Deployed at <https://cog.losno.co>.

Built with [Astro](https://astro.build) and [Tailwind CSS v4](https://tailwindcss.com), styled to the [LoSnoCo design system](https://losno.co). The release list and download links are pulled at build time from the Sparkle appcast at `cogcdn.cog.losno.co/mercury.json`.

## Commands

| Command         | Action                                       |
| :-------------- | :------------------------------------------- |
| `bun install`   | Install dependencies                         |
| `bun dev`       | Start dev server at `localhost:4321`         |
| `bun build`     | Build production site to `./dist/`           |
| `bun preview`   | Preview the production build locally         |
