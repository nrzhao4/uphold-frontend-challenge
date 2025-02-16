import { useState, useEffect } from "react";
import { fetchTickers } from "../components/api/api";
import { getPairs, handleTickersResult } from "../helpers/exchangeRatesHelper";
import { supportedCurrencies } from "../constants/supported-currencies";

const useCurrencyRates = (currency, cache, setCache) => {
  const [pairExchangeRates, setPairExchangeRates] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const getTickers = async () => {
      if (cache[currency]) {
        setPairExchangeRates(cache[currency]);
        return;
      }

      setIsLoading(true);
      setIsError(false);
      const pairs = getPairs(currency, supportedCurrencies);
      try {
        const rates = await fetchTickers(currency);
        if (isMounted) {
          const processedRates = handleTickersResult(pairs, rates);
          setPairExchangeRates(processedRates);
          setCache((prev) => ({ ...prev, [currency]: processedRates }));
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setIsError(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    getTickers();

    return () => {
      isMounted = false;
    };
  }, [currency, cache, setCache]);

  return { pairExchangeRates, isLoading, isError };
};

export default useCurrencyRates;
