# flyingsalmon

A [shadcn](https://ui.shadcn.com) registry that doubles as a design system: a warm orange theme and 42 components, published under the `@flyingsalmon` namespace.

Docs and live previews: **https://flyingsalmon.superbrian.dev**

> **Disclaimer:** this repo was mostly developed by [Claude Code](https://claude.com/claude-code), with design direction and review by a human.

## Install

In a project already set up with Tailwind CSS v4 and `shadcn init`, register the namespace in `components.json`:

```json
{
  "registries": {
    "@flyingsalmon": "https://flyingsalmon.superbrian.dev/r/{name}.json"
  }
}
```

Install the theme first, because every component reads its color, radius, and motion tokens:

```sh
npx shadcn@latest add @flyingsalmon/theme
```

Then add components by name:

```sh
npx shadcn@latest add @flyingsalmon/button @flyingsalmon/card
```

## Develop

```sh
pnpm install
pnpm dev     # docs site on http://localhost:3000
pnpm check   # format, lint, type check, tests
pnpm build   # registry JSON into public/r, then the docs site
```

## License

[MIT](LICENSE). The Bricolage Grotesque and Onest fonts are installed from Fontsource and licensed under the SIL Open Font License 1.1.
