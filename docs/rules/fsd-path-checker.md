# Feature sliced design import checker (`fsd-turbo-plugin/fsd-path-checker`)

## Rule Details

This rule aims to ensure that imports within the same slices are relative.

Examples of **incorrect** code for this rule:

```js
// filename is src/shared/ui/button.tsx
import type { IButton } from "@shared/lib/types/button";
```

Examples of **correct** code for this rule:

```js
// filename is src/shared/ui/button.tsx
import type { IButton } from "../lib/types/button";
```

### Options

- alias: string

## When Not To Use It

This rule should be used only when the project is using the feature sliced design architecture.
