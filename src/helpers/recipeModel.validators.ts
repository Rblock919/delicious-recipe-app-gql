export const isNotBlueApron = function(): boolean {
  return this.producer !== 'Blue Apron';
};

export const isHelloFresh = function(): boolean {
  return this.producer === 'Hello Fresh';
};

const isNotNegative = (value): boolean => {
  return value > 0;
};

export const validateNutritionNumber = {
  validator: isNotNegative,
  message: 'Value Cannot Be Negative',
};
