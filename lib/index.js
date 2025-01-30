import publicApiImportRile from "./rules/public-api-import.js";
import fsdPathChecker from "./rules/fsd-path-checker.js";

/**
 * @fileoverview eslint plugin for FSD architecture
 * @author abuzar
 */

const config = {
  rules: {
    "public-api-import": publicApiImportRile,
    "fsd-path-checker": fsdPathChecker,
  },
};

export default config;
