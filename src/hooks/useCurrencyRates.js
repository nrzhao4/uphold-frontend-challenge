import { useState, useEffect } from "react";
import { fetchTickers } from "../components/api/api";
import {
  getPairs,
  handleTickersResult,
} from "../helpers/exchangeRatesHelper/exchangeRatesHelper";
import { supportedCurrencies } from "../constants/supported-currencies";
import { shouldClearCache } from "../helpers/cacheHelper/cacheHelper";

const useCurrencyRates = (currency, cache, setCache) => {
  const [pairExchangeRates, setPairExchangeRates] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [cacheInitTimestamp, setCacheInitTimestamp] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const getTickers = async () => {
      const TEN_MINUTES_IN_MS = 600000;
      if (shouldClearCache(cacheInitTimestamp, TEN_MINUTES_IN_MS)) {
        clearCache();
      } else if (cache[currency]) {
        setPairExchangeRates(cache[currency]);
        return;
      }

      setIsLoading(true);
      setIsError(false);
      const pairs = getPairs(currency, supportedCurrencies);
      try {
        const rates = await fetchTickers(currency);
        if (!isMounted) return;

        const processedRates = handleTickersResult(pairs, rates);
        setPairExchangeRates(processedRates);

        if (!cacheInitTimestamp) {
          setCacheInitTimestamp(Date.now());
        }
        setCache((prev) => ({ ...prev, [currency]: processedRates }));
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
  }, [currency]);

  const clearCache = () => {
    setCache({});
    setCacheInitTimestamp(null);
  };

  return { pairExchangeRates, isLoading, isError };
};

export default useCurrencyRates;
