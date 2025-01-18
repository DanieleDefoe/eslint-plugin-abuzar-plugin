# Feature sliced design import checker (`abuzar-plugin/fsd-path-checker`)

<!-- end auto-generated rule header -->

Check that imports within the same slices are relative

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

If there are any options, describe them here. Otherwise, delete this section.

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
