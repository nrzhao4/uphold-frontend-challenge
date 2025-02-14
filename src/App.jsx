import React, { useState, useEffect } from "react";
import "./App.css";
import upholdSdk from "./utils/uphold-sdk";
import CurrencyInput from "./components/CurrencyInput/CurrencyInput";
import { supportedCurrencies } from "./constants/supported-currencies";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [amountToConvert, setAmountToConvert] = useState("1");
  const [currency, setCurrency] = useState("USD");
  const [pairExchangeRates, setPairExchangeRates] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function handleAmountToConvertChange(amount) {
    setAmountToConvert(amount);
  }

  function handleSelectedCurrencyChange(currencyId) {
    setCurrency(currencyId);
  }

  function definePairs() {
    const pairs = {};
    supportedCurrencies.forEach((supportedCurrency) => {
      if (supportedCurrencies !== currency) {
        const pairName = currency + supportedCurrency.id;
        pairs[pairName] = null;
      }
    });
    console.log(pairs);
    return pairs;
  }

  useEffect(() => {
    const pairs = definePairs();
    fetchPairExchangeRate(pairs);
  }, [currency]);

  async function fetchPairExchangeRate(pairs) {
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
  }

  useEffect(() => {
    setCurrencyOptions(supportedCurrencies);
    // TODO: clean up
  });

  const displayExchangeRateResults = () => {
    return (
      <div className="columns">
        {Object.keys(pairExchangeRates).map((pair) => {
          if (pairExchangeRates[pair] !== null) {
            const rate = pairExchangeRates[pair];
            return (
              <h2 key={pair}>
                {rate.ask * amountToConvert} {rate.currency}
              </h2>
            );
          }
        })}
      </div>
    );
  };

  return (
    <>
      <CurrencyInput
        currencyOptions={currencyOptions}
        updateAmount={handleAmountToConvertChange}
        updateSelectedCurrency={handleSelectedCurrencyChange}
        isDisabled={isLoading}
      />
      {isLoading && <h2>Loading...</h2>}
      {!isLoading &&
        Object.keys(pairExchangeRates).length !== 0 &&
        displayExchangeRateResults()}
    </>
  );
}

export default App;
