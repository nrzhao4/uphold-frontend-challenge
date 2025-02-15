import React from "react";
import "./styles.css";
import { Avatar } from "@mui/material";
import PropTypes from "prop-types";
import { supportedCurrenciesIcons } from "../../constants/supported-currencies";
import dropdownIcon from "../../assets/dropdown-icon.svg";

CurrencyChipCustom.propTypes = {
  currency: PropTypes.string.isRequired,
  showDropdownIcon: PropTypes.bool,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
};

function CurrencyChipCustom({
  currency,
  showDropdownIcon,
  onClick,
  isDisabled,
}) {
  const handleClick = (e) => {
    if (isDisabled) return;
    onClick && onClick(e);
  };

  return (
    <span
      className={`currency-chip ${isDisabled ? "disabled" : ""}`}
      onClick={handleClick}
    >
      <Avatar
        alt={currency}
        src={supportedCurrenciesIcons[currency.toLowerCase()]}
        sx={{ width: 16, height: 16 }}
      />
      <strong>{currency}</strong>
      {showDropdownIcon && <img src={dropdownIcon} alt="Dropdown icon" />}
    </span>
  );
}

export default CurrencyChipCustom;
