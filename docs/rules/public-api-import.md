# External modules should be imported via public api (`public-api-import`)

## Rule Details

This rule aims to prevent imports from external modules to the public api.

Examples of **incorrect** code for this rule:

```js
import { module } from "~/entities/article/lib/module";
```

Examples of **correct** code for this rule:

```js
import { module } from "~/entities/article";
```

### Options

- alias: string

## When Not To Use It

This rule should be used only when the project is using the feature sliced design architecture.
