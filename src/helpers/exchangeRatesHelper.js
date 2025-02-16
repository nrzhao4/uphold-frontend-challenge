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
