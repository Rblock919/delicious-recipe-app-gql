export const assembleMap = function(
  ratersKeys: string[],
  ratersValues: string[]
) {
  // can't actually use Map type here because typescripts map will serialize to empty object when used in an http request
  const returnMap = {} as any;
  ratersKeys.forEach((key, index) => {
    returnMap[key] = ratersValues[index];
  });
  return returnMap;
};
