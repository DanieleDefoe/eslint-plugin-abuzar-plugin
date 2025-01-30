import path from "path";
import micromatch from "micromatch";
import {
  allowedLayerImports,
  isPathRelative,
  layers,
  src,
} from "../../helpers/index.js";

/**
 * @fileoverview Only lower layers can be imported
 * @author Abuzar
 */

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: "problem",
    docs: {
      description: "Only lower layers can be imported",
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
          ignoreImportPatterns: {
            type: "array",
          },
        },
      },
    ],
    messages: {
      "fsd-layer-import-error": "Only lower layers can be imported",
    },
  },

  create(context) {
    const { alias = "", ignoreImportPatterns = [] } = context.options[0] ?? {};

    const getCurrentFileLayer = () => {
      const { filename } = context;
      const normalizedPath = path.toNamespacedPath(filename);
      const projectPath = normalizedPath.split(src).at(1);
      const segments = projectPath?.split(path.sep);
      return segments?.at(1);
    };

    const getImportLayer = (value) => {
      const importPath = alias
        ? value.replace(`${alias}${path.sep}`, "")
        : value;

      const segments = importPath.split(path.sep);

      return segments.at(0);
    };

    return {
      ImportDeclaration(node) {
        const importPath = node.source.value;
        const currentFileLayer = getCurrentFileLayer();
        const importLayer = getImportLayer(importPath);

        if (isPathRelative(importPath)) return;

        if (!layers.includes(importLayer) || !layers.includes(currentFileLayer))
          return;

        const isIgnored = ignoreImportPatterns.some((pattern) =>
          micromatch.isMatch(importPath, pattern)
        );

        if (isIgnored) return;

        if (!allowedLayerImports[currentFileLayer]?.includes(importLayer)) {
          context.report({
            node,
            messageId: "fsd-layer-import-error",
          });
        }
      },
    };
  },
};
