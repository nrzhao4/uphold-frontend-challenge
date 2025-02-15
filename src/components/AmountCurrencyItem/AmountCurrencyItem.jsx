import React from "react";
import PropTypes from "prop-types";
import "./styles.css";
import Avatar from "@mui/material/Avatar";
import { supportedCurrenciesIcons } from "../../constants/supported-currencies";
import { Skeleton } from "@mui/material";

AmountCurrencyItem.propTypes = {
  amount: PropTypes.number,
  currencyId: PropTypes.string,
  isLoading: PropTypes.bool,
};

function AmountCurrencyItem({ amount, currencyId, isLoading }) {
  const formattedAmount = () => {
    const MAX_AMOUNT_LENGTH = 7;
    return amount.toString().substring(0, MAX_AMOUNT_LENGTH);
  };

  return (
    <div className="amount-currency-item">
      {!isLoading && (
        <>
          <strong>{formattedAmount()}</strong>
          <span className="currency-name">
            <Avatar
              alt={currencyId}
              src={supportedCurrenciesIcons[currencyId.toLowerCase()]}
              sx={{ width: 16, height: 16 }}
            />
            <strong>{currencyId}</strong>
          </span>
        </>
      )}
      {isLoading && (
        <>
          <Skeleton variant="rounded" width={64} height={18} />
          <span className="currency-name">
            <Skeleton variant="circular" width={16} height={16} />
            <Skeleton variant="rounded" width={24} height={18} />
          </span>
        </>
      )}
    </div>
  );
}

export default AmountCurrencyItem;
