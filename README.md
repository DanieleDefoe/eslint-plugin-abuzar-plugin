# eslint-plugin-abuzar-plugin

eslint plugin for FSD architecture

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i -D eslint 
```

```sh
yarn add -D eslint 
```

```sh
pnpm i -D eslint 
```

Next, install `eslint-plugin-abuzar-plugin`:

```sh
npm i -D eslint-plugin-abuzar-plugin
```

```sh
yarn add -D eslint-plugin-abuzar-plugin
```

```sh
pnpm i -D eslint-plugin-abuzar-plugin
```

## Usage

In your [configuration file](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file), import the plugin `eslint-plugin-abuzar-plugin` and add `abuzar-plugin` to the `plugins` key:

```js
import abuzarPlugin from "eslint-plugin-abuzar-plugin";

export default [
  {
    plugins: {
      "abuzar-plugin": abuzarPlugin,
    },
  },
];
```

Or if you are using the old ESLint config format

```js
export default {
  plugins: ["abuzar-plugin"],
};
```

Then configure the rules you want to use under the `rules` key.

```js
import abuzarPlugin from "eslint-plugin-abuzar-plugin";

export default [
  {
    plugins: {
      "abuzar-plugin": abuzarPlugin,
    },
    rules: {
      "abuzar-plugin/fsd-path-checker": "error",
    },
  },
];
```

## Rules

<!-- begin auto-generated rules list -->

| Name                                               | Description                          |
| :------------------------------------------------- | :----------------------------------- |
| [fsd-path-checker](docs/rules/fsd-path-checker.md) | feature sliced design import checker |

<!-- end auto-generated rules list -->
