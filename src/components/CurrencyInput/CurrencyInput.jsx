import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { supportedCurrenciesIcons } from "../../constants/supported-currencies";
import "./styles.css";
import { Avatar, ListItemIcon, ListItemText } from "@mui/material";
import CurrencyChipCustom from "../CurrencyChipCustom/CurrencyChipCustom";

CurrencyInput.propTypes = {
  currencyOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  amount: PropTypes.number.isRequired,
  setAmount: PropTypes.func.isRequired,
  selectedCurrency: PropTypes.string.isRequired,
  setSelectedCurrency: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};

function CurrencyInput({
  currencyOptions,
  amount,
  setAmount,
  selectedCurrency,
  setSelectedCurrency,
  isDisabled,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const delayInputTimeout = setTimeout(() => {
      setAmount(amount);
    }, 500);
    return () => clearTimeout(delayInputTimeout);
  }, [amount, 500]);

  const handleAmountChange = (event) => {
    const amount = event.target.value;
    if (isNaN(amount)) return;
    setAmount(amount);
  };

  const handleSelectedCurrencyChange = (currencyId) => {
    setSelectedCurrency(currencyId);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="currency-input-container">
      <input
        name="myInput"
        type="text"
        value={amount}
        onChange={handleAmountChange}
        disabled={isDisabled}
        className="input"
      />
      <div className="menu-chip" role="button">
        <CurrencyChipCustom
          currency={selectedCurrency}
          showDropdownIcon
          onClick={handleClick}
          aria-controls={open ? "currency-select" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          isDisabled={isDisabled}
          id="currency-select-button"
        />
      </div>
      <Menu
        id="currency-select"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "currency-select-button",
        }}
      >
        {currencyOptions &&
          Array.isArray(currencyOptions) &&
          currencyOptions.map((currency) => (
            <MenuItem
              key={currency.id}
              value={currency.id}
              onClick={() => {
                handleSelectedCurrencyChange(currency.id);
                handleClose();
              }}
            >
              <ListItemIcon>
                <Avatar
                  alt={currency.name}
                  src={supportedCurrenciesIcons[currency.id.toLowerCase()]}
                  sx={{ width: 16, height: 16 }}
                />
              </ListItemIcon>
              <ListItemText>{currency.name}</ListItemText>
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
}

export default CurrencyInput;
