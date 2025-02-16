import React, { useState } from "react";
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
  placeholder: PropTypes.string,
};

function CurrencyInput({
  currencyOptions,
  amount,
  setAmount,
  selectedCurrency,
  setSelectedCurrency,
  isDisabled,
  placeholder,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
    <div className="container">
      <div className="test">
        <input
          name="amountInput"
          type="text"
          value={amount}
          onChange={handleAmountChange}
          disabled={isDisabled}
          className="input"
          placeholder={placeholder}
        />
        <div className="menu-chip">
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
              data-testid="dropdown-menu"
            >
              <ListItemIcon data-testid="dropdown-menu-item">
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
