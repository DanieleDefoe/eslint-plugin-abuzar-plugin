/** @param {string} path @returns {boolean} */
export function isPathRelative(path) {
  return path === "." || path.startsWith("./") || path.startsWith("../");
}

export const layers = [
  "shared",
  "entities",
  "features",
  "widgets",
  "pages",
  "app",
];

export const testingLayers = ["__tests__", "__stories__"];

export const layersWithoutApp = layers.filter((layer) => layer !== "app");

export const aliasOptions = [{ alias: "~" }];

export const testFilesOptions = [
  { alias: "~", testFiles: ["**/*.test.{ts,tsx}", "**/*.stories.{ts,tsx}"] },
];
