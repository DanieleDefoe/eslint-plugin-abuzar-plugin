/**
 * @fileoverview feature sliced design import checker
 * @author abuzar
 */
"use strict";

const path = require("path");

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "feature sliced design import checker",
      recommended: false,
      url: null,
    },
    fixable: null,
    schema: [
      {
        type: "object",
        properties: {
          alias: {
            type: "string",
          },
        },
      },
    ],
    messages: {
      "fsd-relative-import-error":
        "Imports within the same slices should be relative",
    },
  },
  create(context) {
    const alias = context.options[0]?.alias ?? "";

    return {
      ImportDeclaration(node) {
        const importTo = node.source.value;
        const { filename } = context;

        if (shouldBeRelative(filename, importTo, alias)) {
          context.report({
            node,
            messageId: "fsd-relative-import-error",
          });
        }
      },
    };
  },
};

/** @param {string} path @returns {boolean} */
function isPathRelative(path) {
  return path === "." || path.startsWith("./") || path.startsWith("../");
}

const src = "src";

const layers = ["shared", "entities", "features", "widgets", "pages", "app"];

/** @param {string} from @param {string} to @param {string} alias @returns {boolean} */
function shouldBeRelative(from, to, alias) {
  if (isPathRelative(to)) {
    return false;
  }

  if (!alias) {
    return handleWithoutAlias(from, to);
  }

  const toArray = to.split("/");
  const toFirst = toArray.at(0);
  const toLayer = toArray.at(1);
  const toSlice = toArray.at(2);

  if (!toLayer || !toSlice || alias !== toFirst || !layers.includes(toLayer)) {
    return false;
  }

  const normalizedPath = path.toNamespacedPath(from);
  const projectFrom = normalizedPath.split(src).at(1);
  const fromArray = projectFrom.split(path.sep);
  const fromLayer = fromArray.at(1);
  const fromSlice = fromArray.at(2);

  if (!fromLayer || !fromSlice || !layers.includes(fromLayer)) {
    return false;
  }

  if (fromLayer !== toLayer) {
    return false;
  }

  return fromLayer === "shared" || fromSlice === toSlice;
}

/** @param {string} from @param {string} to @returns {boolean} */
function handleWithoutAlias(from, to) {
  const toArray = to.split("/");
  const toLayer = toArray.at(0);
  const toSlice = toArray.at(1);

  if (!toLayer || !toSlice || !layers.includes(toLayer)) {
    return false;
  }

  const normalizedPath = path.toNamespacedPath(from);
  const projectFrom = normalizedPath.split(src).at(1);
  const fromArray = projectFrom.split(path.sep);
  const fromLayer = fromArray.at(1);
  const fromSlice = fromArray.at(2);

  if (!fromLayer || !fromSlice || !layers.includes(fromLayer)) {
    return false;
  }

  if (fromLayer !== toLayer) {
    return false;
  }

  return fromLayer === "shared" || fromSlice === toSlice;
}
