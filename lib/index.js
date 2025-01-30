import publicApiImportRule from "./rules/public-api-import.js";
import fsdPathCheckerRule from "./rules/fsd-path-checker.js";
import fsdLayerImportsRule from "./rules/fsd-layer-imports.js";

/**
 * @fileoverview eslint plugin for FSD architecture
 * @author abuzar
 */

export default {
  rules: {
    "public-api-import": publicApiImportRule,
    "fsd-path-checker": fsdPathCheckerRule,
    "fsd-layer-imports": fsdLayerImportsRule,
  },
};
