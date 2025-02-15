import React from "react";
import PropTypes from "prop-types";
import "./styles.css";
import Avatar from "@mui/material/Avatar";
import { supportedCurrenciesIcons } from "../../constants/supported-currencies";

AmountCurrencyItem.propTypes = {
  amount: PropTypes.number.isRequired,
  currencyId: PropTypes.string.isRequired,
};

function AmountCurrencyItem({ amount, currencyId }) {
  const formattedAmount = () => {
    const MAX_AMOUNT_LENGTH = 7;
    return amount.toString().substring(0, MAX_AMOUNT_LENGTH);
  };

  return (
    <>
      <div className="amount-currency-item">
        <strong>{formattedAmount()}</strong>
        <span className="currency-name">
          <Avatar
            alt={currencyId}
            src={supportedCurrenciesIcons[currencyId.toLowerCase()]}
            sx={{ width: 16, height: 16 }}
          />
          <strong>{currencyId}</strong>
        </span>
      </div>
    </>
  );
}

export default AmountCurrencyItem;
