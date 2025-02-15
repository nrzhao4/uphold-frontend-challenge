import React, { useState, useEffect } from "react";
import "./App.css";
import upholdSdk from "./utils/uphold-sdk";
import CurrencyInput from "./components/CurrencyInput/CurrencyInput";
import AmountCurrencyItem from "./components/AmountCurrencyItem/AmountCurrencyItem";
import { supportedCurrencies } from "./constants/supported-currencies";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [amountToConvert, setAmountToConvert] = useState("100.00");
  const [currency, setCurrency] = useState("USD");
  const [pairExchangeRates, setPairExchangeRates] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [cache, setCache] = useState({});

  useEffect(() => {
    setCurrencyOptions(supportedCurrencies);
    // TODO: clean up
  });

  useEffect(() => {
    getTickers();
  }, [currency]);

  const getTickers = async () => {
    if (cache[currency] !== undefined) {
      getResultsFromCache();
      return;
    }

    setIsLoading(true);
    const pairs = definePairs();
    const rates = await fetchTickers();
    handleTickersResult(pairs, rates);
    setIsLoading(false);
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

  const getResultsFromCache = async () => {
    const pairs = cache[currency];
    setPairExchangeRates(pairs);
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
              />
            );
          }
        })}
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
          amount={amountToConvert}
          setAmount={setAmountToConvert}
          selectedCurrency={currency}
          setSelectedCurrency={setCurrency}
          isDisabled={isLoading}
        />
        {isLoading && <h2>Loading...</h2>}
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
