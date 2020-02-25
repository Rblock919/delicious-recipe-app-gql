function assembleMap(ratersKeys, ratersValues) {
  const returnMap = new Map();
  let counter = 0;
  for (const key of ratersKeys) {
    returnMap[key] = ratersValues[counter];
    counter++;
  }
  return returnMap;
}

module.exports = assembleMap;
