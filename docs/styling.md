# Styling

- Tokens: `src/styles.css`.
- Primitives: `src/ui/`.
- Shared primitives are introduced only after repeated product use.
- Call sites use Tailwind v4 utilities.

## Tokens

- Colors use semantic `@theme` tokens.
- Default palette is disabled.
- Use token classes: `text-muted`, `bg-surface`, `border-border`, `bg-primary`.
- Roles: `background`, `surface`, `foreground`, `muted`, `border`, `input`, `primary`, `primary-hover`, `primary-foreground`, `danger`, `ring`.
- Body text needs no color class.
- `muted` is secondary text.
- `surface` is neutral filled UI.
- `border` is containers and dividers.
- `input` is form control borders.
- Add tokens only for repeated roles.
- Name roles, not hues.
- Raw colors stay in `src/styles.css` or browser drawing code.
- Do not use arbitrary color utilities in TSX.

## Utilities

- Use utilities for layout, spacing, type, radius, borders, and states.
- Use token color utilities only.
- Prefer parent `gap-*` over sibling margins.
- Radius: controls `rounded-md`, containers `rounded-lg`, pills `rounded-full`.
- Editorial display headings use `display-heading`.
- Eyebrows and section labels use `eyebrow` or the matching section-owned style.
- Body copy remains sans-serif; display copy is serif; metadata and navigation are monospace.
- Secondary text uses `text-muted`.
- Fine print uses `text-xs`.
- Focus is global.
- Do not add per-element rings.
- Long repeated class strings become primitives or page components.

## Primitives

- `SiteShell` owns the shared navigation, theme control, landmarks, skip link, and footer.
- `pageHead` owns shared metadata, theme bootstrap, styles, and the pinned Datastar runtime.
- Wrap native elements.
- Pass native and Datastar `data-*` attributes through.
- Variants are typed object maps.
- No `cva`, `clsx`, `tailwind-merge`, or runtime styling libraries.
- Primitives own internal classes.
- Call-site `class` is for layout or one-off formatting only.
- Restyle primitives with a variant or a primitive fix.
- Extract after repeated real use.
- Prefer native elements.
- Keep one primitive family per `src/ui/` file.
- Native wrappers use `HtmlElements["tag"] & { ... }` props.
- Start with minimal variants.
- Cover new primitives through their real product call sites.

## CSS

- `src/styles.css` owns `@theme`, light/dark role mappings, base styles, editorial roles, globals, keyframes, third-party overrides, prose, and awkward selectors.
- Keep product CSS small.
- Use more CSS for generated or content-heavy markup.
- True one-offs stay inline as utilities.

## Check

- No palette colors in TSX.
- No arbitrary color utilities in TSX.
- No raw colors in component TSX.
- Repeated UI becomes a primitive or page component.
- Interactive elements are native and keyboard-reachable.
- New primitives have a real repeated product use.
