export const getNormalizedDate = (date: Date) => {
  const currentDate = date.toLocaleDateString('fr-CH');

  return currentDate.split('.').join('-');
};

export const getNormalizedCurrency = (currencyItem: number) => {
  return currencyItem.toFixed(2);
}
