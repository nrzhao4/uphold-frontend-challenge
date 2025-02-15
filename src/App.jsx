import React, { useState, useEffect } from "react";
import "./App.css";
import upholdSdk from "./utils/uphold-sdk";
import CurrencyInput from "./components/CurrencyInput/CurrencyInput";
import AmountCurrencyItem from "./components/AmountCurrencyItem/AmountCurrencyItem";
import { supportedCurrencies } from "./constants/supported-currencies";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [amountToConvert, setAmountToConvert] = useState("100.00");
  const [currency, setCurrency] = useState("USD");
  const [pairExchangeRates, setPairExchangeRates] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCurrencyOptions(supportedCurrencies);
    // TODO: clean up
  });

  useEffect(() => {
    const pairs = definePairs();
    fetchPairExchangeRate(pairs);
  }, [currency]);

  const definePairs = () => {
    const pairs = {};
    supportedCurrencies.forEach((supportedCurrency) => {
      if (supportedCurrencies !== currency) {
        const pairName = currency + supportedCurrency.id;
        pairs[pairName] = null;
      }
    });
    console.log(pairs);
    return pairs;
  };

  const fetchPairExchangeRate = async (pairs) => {
    setIsLoading(true);
    const keys = Object.keys(pairs);
    for (const key of keys) {
      try {
        const rate = await upholdSdk.getTicker(key);
        pairs[key] = {
          ask: rate.ask,
          currency: rate.currency,
        };
      } catch (error) {
        console.error(`Error fetching rate for ${key}:`, error);
      }
    }
    setIsLoading(false);
    console.log(pairs);
    setPairExchangeRates(pairs);
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
                amount={rate.ask * parseAmountToConvert()}
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
          Object.keys(pairExchangeRates).length !== 0 &&
          displayExchangeRateResults()}
      </div>
    </>
  );
}

export default App;
