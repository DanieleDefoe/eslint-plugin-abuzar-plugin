import publicApiImportRule from "./rules/public-api-import.js";
import fsdPathCheckerRule from "./rules/fsd-path-checker.js";

/**
 * @fileoverview eslint plugin for FSD architecture
 * @author abuzar
 */

const config = {
  rules: {
    "public-api-import": publicApiImportRule,
    "fsd-path-checker": fsdPathCheckerRule,
  },
};

export default config;
