export const removeDuplicates = <T>(array: T[]): T[] => {
  return Array.from(new Set(array));
};

export const groupBy = <T, K extends keyof T>(array: T[], key: K) => {
  return array.reduce(
    (result, currentValue) => {
      (result[currentValue[key] as string] =
        result[currentValue[key] as string] || []).push(currentValue);
      return result;
    },
    {} as Record<string, T[]>,
  );
};
