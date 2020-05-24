export const assembleMap = function(
  ratersKeys: string[],
  ratersValues: string[]
) {
  // TODO: test using ts map here again now that this service is writing directly to the DB
  // can't actually use Map type here because typescripts map will serialize to empty object when used in an http request
  const returnMap = {} as any;
  ratersKeys.forEach((key, index) => {
    returnMap[key] = ratersValues[index];
  });
  return returnMap;
};
