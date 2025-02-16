export const getPairs = (currency, supportedCurrencies) => {
  const pairs = {};
  supportedCurrencies.forEach((supportedCurrency) => {
    if (supportedCurrencies !== currency) {
      const pairName = currency + supportedCurrency.id;
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
    return amountStr.substring(0, 7);
  }

  const decimalPart = amountStr.split(".")[1];
  return integerPart + "." + decimalPart.substring(0, 2);
};
