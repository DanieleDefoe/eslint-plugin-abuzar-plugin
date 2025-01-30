import {
  isPathRelative,
  layersWithoutApp,
  testingLayers,
} from "../../helpers/index.js";
import path from "path";
import micromatch from "micromatch";

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
          testFiles: {
            type: "array",
          },
        },
      },
    ],
    messages: {
      "public-api-import":
        "External modules should be imported via public api (index.ts)",
      "testing-public-api-import":
        "Testing modules should be imported via public api (testing.ts)",
    },
  },

  create(context) {
    const { filename } = context;
    const { alias = "", testFiles = [] } = context.options[0] ?? {};

    return {
      ImportDeclaration(node) {
        const value = node.source.value;

        const importTo = alias
          ? value.replace(`${alias}${path.sep}`, "")
          : value;

        if (isPathRelative(importTo)) return;

        const segments = importTo.split(path.sep);

        const layer = segments.at(0);

        if (!layersWithoutApp.includes(layer) && !testingLayers.includes(layer))
          return;

        const isImportNotFromPublicApi = segments.length > 2;

        const isTestingPublicApi =
          segments.at(2) === "testing" && segments.length < 4;

        if (isTestingPublicApi) {
          const isCurrentFileTesting = testFiles.some((pattern) =>
            micromatch.isMatch(filename, pattern)
          );

          if (!isCurrentFileTesting) {
            context.report({
              node,
              messageId: "testing-public-api-import",
            });
          }
        }

        if (isImportNotFromPublicApi && !isTestingPublicApi) {
          context.report({
            node,
            messageId: "public-api-import",
          });
        }
      },
    };
  },
};
