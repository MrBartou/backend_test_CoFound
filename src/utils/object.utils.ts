export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

export const mergeObjects = <T, U>(target: T, source: U): T & U => {
  return { ...target, ...source };
};
