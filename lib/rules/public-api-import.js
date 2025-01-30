import { isPathRelative, layers } from "../../helpers/index.js";
import path from "path";

/**
 * @fileoverview External modules should be imported via public api
 * @author Abuzar
 */

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: "problem",
    docs: {
      description: "External modules should be imported via public api",
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
      "public-api-import":
        "External modules should be imported via public api (index.ts)",
    },
  },

  create(context) {
    const alias = context.options[0]?.alias ?? "";

    return {
      ImportDeclaration(node) {
        const value = node.source.value;
        const importTo = alias
          ? value.replace(`${alias}${path.sep}`, "")
          : value;

        if (isPathRelative(importTo)) return;

        const segments = importTo.split(path.sep);

        const layer = segments.at(0);

        if (!layers.includes(layer)) return;

        const isImportNotFromPublicApi = segments.length > 2;

        if (isImportNotFromPublicApi) {
          context.report({
            node,
            messageId: "public-api-import",
          });
        }
      },
    };
  },
};

console.log(isPathRelative("src/features/addCommentForm/lib/module"));
