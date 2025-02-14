import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../../App.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

CurrencyInput.propTypes = {
  currencyOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateAmount: PropTypes.func.isRequired,
  updateSelectedCurrency: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};

function CurrencyInput({
  currencyOptions,
  updateAmount,
  updateSelectedCurrency,
  isDisabled,
}) {
  const [amount, setAmount] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  useEffect(() => {
    const delayInputTimeout = setTimeout(() => {
      updateAmount(Number(amount));
    }, 500);
    return () => clearTimeout(delayInputTimeout);
  }, [amount, 500]);

  function handleAmountChange(event) {
    const newAmount = Number(event.target.value);
    if (isNaN(newAmount)) return;
    setAmount(newAmount);
  }

  function handleSelectedCurrencyChange(event) {
    setSelectedCurrency(event.target.value);
    updateSelectedCurrency(event.target.value);
  }

  return (
    <div className="row">
      <TextField
        name="myInput"
        type="text"
        value={amount}
        onChange={handleAmountChange}
        disabled={isDisabled}
        variant="outlined"
        size="small"
      />
      <Select
        value={selectedCurrency}
        onChange={handleSelectedCurrencyChange}
        disabled={isDisabled}
        size="small"
      >
        {currencyOptions &&
          Array.isArray(currencyOptions) &&
          currencyOptions.map((currency) => (
            <MenuItem key={currency.id} value={currency.id}>
              {currency.name}
            </MenuItem>
          ))}
      </Select>
    </div>
  );
}

export default CurrencyInput;
