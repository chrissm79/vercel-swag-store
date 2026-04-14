# @workspace/ui

Shared UI package for the monorepo. Components are scaffolded via [shadcn/ui](https://ui.shadcn.com).

## Use Base UI, not Radix

This package uses the **Base UI** flavor of shadcn components (https://ui.shadcn.com/docs/components/base). When adding a new component, always pull from the Base UI registry, not the default Radix registry.

- Install new components with the Base UI registry:
  ```sh
  bunx shadcn@latest add https://ui.shadcn.com/r/base/<component>.json
  ```
- Primitives come from `@base-ui-components/react` — never add `@radix-ui/*` packages here.
- The polymorphic pattern uses Base UI's `render` prop (via `useRender`), not Radix's `asChild`.

## Layout

- `src/components/` — component source
- `src/lib/utils.ts` — `cn()` helper
- `src/styles/globals.css` — Tailwind v4 entry + design tokens (imported by apps)

## Consumption

Apps import via the package exports:
```tsx
import "@workspace/ui/globals.css";
import { Button } from "@workspace/ui/button";
```
