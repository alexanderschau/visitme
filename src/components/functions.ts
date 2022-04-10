export const genStyle = (customprops: object) =>
  Object.entries(customprops).reduce(
    (acc, [key, value]) => `${acc}; ${key}: ${value}`,
    ""
  );
