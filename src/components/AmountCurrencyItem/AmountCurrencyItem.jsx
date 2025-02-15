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
          <strong data-testid="formatted-amount">{formattedAmount()}</strong>
          <span className="currency-name">
            <Avatar
              data-testid="currency-avatar"
              alt={currencyId}
              src={supportedCurrenciesIcons[currencyId.toLowerCase()]}
              sx={{ width: 16, height: 16 }}
            />
            <strong data-testid="currency-name">{currencyId}</strong>
          </span>
        </>
      )}
      {isLoading && (
        <>
          <Skeleton
            variant="rounded"
            width={64}
            height={18}
            data-testid="loading-skeleton"
          />
          <span className="currency-name">
            <Skeleton
              variant="circular"
              width={16}
              height={16}
              data-testid="loading-skeleton"
            />
            <Skeleton
              variant="rounded"
              width={24}
              height={18}
              data-testid="loading-skeleton"
            />
          </span>
        </>
      )}
    </div>
  );
}

export default AmountCurrencyItem;
