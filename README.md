# eslint-plugin-fsd-turbo

eslint plugin for FSD architecture

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i -D eslint
```

or

```sh
yarn add -D eslint
```

or

```sh
pnpm i -D eslint
```

Next, install `eslint-plugin-fsd-turbo`:

```sh
npm i -D eslint-plugin-fsd-turbo
```

or

```sh
yarn add -D eslint-plugin-fsd-turbo
```

or

```sh
pnpm i -D eslint-plugin-fsd-turbo
```

## Usage

In your [configuration file](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file), import the plugin `eslint-plugin-fsd-turbo` and add `fsd-turbo` to the `plugins` key:

```js
import fsdTurboPlugin from "eslint-plugin-fsd-turbo";

export default [
  {
    plugins: {
      "fsd-turbo": fsdTurboPlugin,
    },
  },
];
```

Or if you are using the old ESLint config format

```js
export default {
  plugins: ["fsd-turbo"],
};
```

Then configure the rules you want to use under the `rules` key.

```js
import fsdTurboPlugin from "eslint-plugin-fsd-turbo";

export default [
  {
    plugins: {
      "fsd-turbo": fsdTurboPlugin,
    },
    rules: {
      "fsd-turbo/fsd-path-checker": [
        "error",
        {
          alias: "@",
        },
      ],
    },
  },
];
```

## Rules

<!-- begin auto-generated rules list -->

| Name                                                 | Description                          |
| :--------------------------------------------------- | :----------------------------------- |
| [fsd-path-checker](docs/rules/fsd-path-checker.md)   | feature sliced design import checker |
| [public-api-import](docs/rules/public-api-import.md) | only allow imports from public api,  |
|                                                      | from index.ts                        |

<!-- end auto-generated rules list -->
