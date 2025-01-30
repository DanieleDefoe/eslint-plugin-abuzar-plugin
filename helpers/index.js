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

export const aliasOptions = [{ alias: "~" }];
