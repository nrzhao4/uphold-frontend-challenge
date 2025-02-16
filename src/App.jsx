import React, { useState, useEffect } from "react";
import "./App.css";
import CurrencyInput from "./components/CurrencyInput/CurrencyInput";
import AmountCurrencyItem from "./components/AmountCurrencyItem/AmountCurrencyItem";
import { supportedCurrencies } from "./constants/supported-currencies";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

import useCurrencyRates from "./hooks/useCurrencyRates";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [amount, setAmount] = useState("100.00");
  const [amountToConvert, setAmountToConvert] = useState("100.00");
  const [currency, setCurrency] = useState("USD");
  const [cache, setCache] = useState({});
  const { pairExchangeRates, isLoading, isError } = useCurrencyRates(
    currency,
    cache,
    setCache
  );

  useEffect(() => {
    setCurrencyOptions(supportedCurrencies);
  }, []);

  useEffect(() => {
    const DEBOUNCE_MS = 200;
    const delayInputTimeout = setTimeout(() => {
      setAmountToConvert(amount);
    }, DEBOUNCE_MS);

    return () => clearTimeout(delayInputTimeout);
  }, [amount]);

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
          placeholder={"0.00"}
        />
        {isLoading && displayLoadingExchangeRates()}
        {!isLoading && !isError && !amount && (
          <p className="subtitle">Enter an amount to see the rates</p>
        )}
        {!isLoading &&
          !isError &&
          amount > 0 &&
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
