import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AmountCurrencyItem from "./AmountCurrencyItem.jsx";

describe("AmountCurrencyItem", () => {
  it("should render the component", () => {
    render(<AmountCurrencyItem amount={0} currencyId="foo" />);
    screen.debug();
  });
  it("should display formatted amount, avatar, and currency name when isLoading is false", () => {
    render(<AmountCurrencyItem amount={0} currencyId="foo" />);

    const formattedAmount = screen.getByTestId("formatted-amount");
    const avatar = screen.getByTestId("currency-avatar");
    const currencyName = screen.getByTestId("currency-name");
    expect(formattedAmount).toHaveTextContent("0");
    expect(avatar).toBeTruthy();
    expect(currencyName).toHaveTextContent("foo");
  });
  it("should display skeletons when isLoading is true", () => {
    render(<AmountCurrencyItem isLoading={true} />);
    const skeletons = screen.getAllByTestId("loading-skeleton");
    expect(skeletons.length).toBe(3);
  });
});
