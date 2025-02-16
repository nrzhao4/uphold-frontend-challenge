export const getPairs = (currency, supportedCurrencies) => {
  const pairs = {};
  supportedCurrencies.forEach((supportedCurrency) => {
    if (supportedCurrency.name !== currency) {
      const pairName = currency + supportedCurrency.name;
      pairs[pairName] = null;
    }
  });
  return pairs;
};

export const handleTickersResult = (pairs, rates) => {
  if (!pairs || !rates) return {};

  rates.forEach((rate) => {
    if (pairs[rate.pair] !== undefined) {
      pairs[rate.pair] = {
        bid: rate.bid,
        currency: rate.currency,
      };
    }
  });

  return pairs;
};

export const adjustAmountPrecision = (amount) => {
  const INT_PART_MAX_LENGTH = 5;
  const amountStr = amount.toString();
  const integerPart = amountStr.split(".")[0];

  if (integerPart.length <= INT_PART_MAX_LENGTH) {
    const SUBSTRING_LENGTH = 8;
    return amountStr.substring(0, SUBSTRING_LENGTH);
  }

  const decimalPart = amountStr.split(".")[1];
  let result = integerPart;
  if (decimalPart) {
    result += `.${decimalPart.substring(0, 2)}`;
  }
  return result;
};
