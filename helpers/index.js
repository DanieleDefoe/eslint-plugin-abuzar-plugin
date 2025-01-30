/** @param {string} path @returns {boolean} */
export function isPathRelative(path) {
  return path === "." || path.startsWith("./") || path.startsWith("../");
}

/** @type {Array<'shared' | 'entities' | 'features' | 'widgets' | 'pages' | 'app'>} */
export const layers = [
  "shared",
  "entities",
  "features",
  "widgets",
  "pages",
  "app",
];

/** @type {Record<'shared' | 'entities' | 'features' | 'widgets' | 'pages' | 'app', Array<'shared' | 'entities' | 'features' | 'widgets' | 'pages' | 'app'>>} */
export const allowedLayerImports = {
  app: ["shared", "entities", "features", "widgets", "pages"],
  pages: ["shared", "entities", "features", "widgets"],
  widgets: ["shared", "entities", "features"],
  features: ["shared", "entities"],
  entities: ["shared", "entities"],
  shared: ["shared"],
};

export const testingLayers = ["__tests__", "__stories__"];

export const layersWithoutApp = layers.filter((layer) => layer !== "app");

export const aliasOptions = [{ alias: "~" }];

export const testFilesOptions = [
  { alias: "~", testFiles: ["**/*.test.{ts,tsx}", "**/*.stories.{ts,tsx}"] },
];

export const src = "src";
