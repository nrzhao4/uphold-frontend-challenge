import React, { useState, useEffect } from "react";
import "./App.css";
import upholdSdk from "./utils/uphold-sdk";
import CurrencyInput from "./components/CurrencyInput/CurrencyInput";
import AmountCurrencyItem from "./components/AmountCurrencyItem/AmountCurrencyItem";
import { supportedCurrencies } from "./constants/supported-currencies";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [amount, setAmount] = useState("100.00");
  const [amountToConvert, setAmountToConvert] = useState("100.00");
  const [currency, setCurrency] = useState("USD");
  const [pairExchangeRates, setPairExchangeRates] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [cache, setCache] = useState({});

  useEffect(() => {
    setCurrencyOptions(supportedCurrencies);
  }, []);

  useEffect(() => {
    const DEBOUNCE_MS = 500;
    const delayInputTimeout = setTimeout(() => {
      setAmountToConvert(amount);
    }, DEBOUNCE_MS);

    return () => clearTimeout(delayInputTimeout);
  }, [amount]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getTickers = async () => {
      if (cache[currency] !== undefined) {
        getResultsFromCache();
        return;
      }
      setIsLoading(true);
      const pairs = definePairs();
      try {
        const rates = await fetchTickers({ signal: controller.signal });
        if (isMounted) {
          handleTickersResult(pairs, rates);
          setIsLoading(false);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch error:", error);
        }
      }
    };

    getTickers();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [currency]);

  const getResultsFromCache = async () => {
    const pairs = cache[currency];
    setPairExchangeRates(pairs);
  };

  const definePairs = () => {
    const pairs = {};
    supportedCurrencies.forEach((supportedCurrency) => {
      if (supportedCurrencies !== currency) {
        const pairName = currency + supportedCurrency.id;
        pairs[pairName] = null;
      }
    });
    return pairs;
  };

  const fetchTickers = async () => {
    try {
      const response = await upholdSdk.getTicker(currency);
      setIsError(false);
      return response;
    } catch (error) {
      console.error(`Error fetching tickers for currency`, error);
      setIsError(true);
    }
  };

  const handleTickersResult = (pairs, rates) => {
    if (!pairs || !rates) return;

    rates.forEach((rate) => {
      if (pairs[rate.pair] !== undefined) {
        pairs[rate.pair] = {
          bid: rate.bid,
          currency: rate.currency,
        };
      }
    });
    setPairExchangeRates(pairs);
    setCache((prev) => ({ ...prev, [currency]: pairs }));
  };

  const parseAmountToConvert = () => {
    const parsed = parseFloat(amountToConvert);
    if (isNaN(parsed)) {
      return 0;
    }
    return parsed;
  };

  const displayExchangeRateResults = () => {
    return (
      <div className="columns">
        {Object.keys(pairExchangeRates).map((pair) => {
          if (pairExchangeRates[pair] !== null) {
            const rate = pairExchangeRates[pair];
            return (
              <AmountCurrencyItem
                amount={rate.bid * parseAmountToConvert()}
                currencyId={rate.currency}
                key={rate.currency}
                isLoading={false}
              />
            );
          }
        })}
      </div>
    );
  };

  const displayLoadingExchangeRates = () => {
    return (
      <div className="columns">
        {Array.from({ length: 20 }, (_, i) => (
          <AmountCurrencyItem isLoading={true} key={i} />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="header-content">
        <h2>Currency Converter</h2>
        <p className="subtitle">
          Receive competitive and transparent pricing with no hidden spreads.
          See how we compare.
        </p>
      </div>
      <div className="body-content">
        <CurrencyInput
          currencyOptions={currencyOptions}
          amount={amount}
          setAmount={setAmount}
          selectedCurrency={currency}
          setSelectedCurrency={setCurrency}
          isDisabled={isLoading}
        />
        {isLoading && displayLoadingExchangeRates()}
        {!isLoading &&
          !isError &&
          Object.keys(pairExchangeRates).length !== 0 &&
          displayExchangeRateResults()}
        {!isLoading && isError && (
          <ErrorMessage
            subtitle="Sorry, there was an error completing the request."
            footerMessage="Try a different currency or check back later."
          />
        )}
      </div>
    </>
  );
}

export default App;
