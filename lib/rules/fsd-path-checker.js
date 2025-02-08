import path from "path";
import { isPathRelative, layers, src } from "../../helpers/index.js";

/**
 * @fileoverview feature sliced design import checker
 * @author abuzar
 */

export const FSD_IMPORT_ERROR = "fsd-relative-import-error";

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: "problem",
    docs: {
      description: "feature sliced design import checker",
      recommended: false,
      url: null,
    },
    fixable: "code",
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
      [FSD_IMPORT_ERROR]: "Imports within the same slices should be relative",
    },
  },
  create(context) {
    const alias = context.options[0]?.alias ?? "";

    return {
      ImportDeclaration(node) {
        let importTo = node.source.value;
        const { filename } = context;

        if (shouldBeRelative(filename, importTo, alias)) {
          context.report({
            node,
            messageId: FSD_IMPORT_ERROR,
            fix: (fixer) => {
              importTo = alias
                ? importTo.replace(`${alias}${path.sep}`, "")
                : importTo;

              const normalizedPath = getNormalizedCurrentFilePath(filename)
                .split(path.sep)
                .slice(0, -1)
                .join(path.sep);

              let relativePath = path.relative(
                normalizedPath,
                `${path.sep}${importTo}`
              );

              if (!relativePath.startsWith(".")) {
                relativePath = `.${path.sep}${relativePath}`;
              }

              return fixer.replaceText(node.source, `'${relativePath}'`);
            },
          });
        }
      },
    };
  },
};

/** @param {string} currentFilePath @returns {string} */
function getNormalizedCurrentFilePath(currentFilePath) {
  const normalizedPath = path.toNamespacedPath(currentFilePath);
  const projectFrom = normalizedPath.split(src).at(1);
  return projectFrom;
}

/** @param {string} from @param {string} to @param {string} alias @returns {boolean} */
function shouldBeRelative(from, to, alias) {
  if (isPathRelative(to)) {
    return false;
  }

  if (!alias) {
    return handleWithoutAlias(from, to);
  }

  const toArray = to.split(path.sep);
  const toFirst = toArray.at(0);
  const toLayer = toArray.at(1);
  const toSlice = toArray.at(2);

  if (!toLayer || !toSlice || alias !== toFirst || !layers.includes(toLayer)) {
    return false;
  }

  const projectFrom = getNormalizedCurrentFilePath(from);
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
  const toArray = to.split(path.sep);
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
