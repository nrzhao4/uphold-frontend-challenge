import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CurrencyInput from "./CurrencyInput";

const mockCurrencyOptions = [{ id: "foo", name: "foo" }];

describe("CurrencyInput", () => {
  it("should render the component", () => {
    render(
      <CurrencyInput
        currencyOptions={mockCurrencyOptions}
        amount={0}
        setAmount={vi.fn()}
        selectedCurrency={"foo"}
        setSelectedCurrency={vi.fn()}
      />
    );
  });
  it("should display input and dropdown button", () => {
    render(
      <CurrencyInput
        currencyOptions={mockCurrencyOptions}
        amount={0}
        setAmount={vi.fn()}
        selectedCurrency={"foo"}
        setSelectedCurrency={vi.fn()}
      />
    );
    const input = screen.getByRole("textbox");
    const dropdown = screen.getByRole("button");
    expect(input).toBeTruthy();
    expect(dropdown).toBeTruthy();
  });
  it("should call setAmount when a numerical value is entered in the input", () => {
    const mockSetAmount = vi.fn();
    render(
      <CurrencyInput
        currencyOptions={mockCurrencyOptions}
        amount={0}
        setAmount={mockSetAmount}
        selectedCurrency={"foo"}
        setSelectedCurrency={vi.fn()}
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: 123.0 } });
    expect(mockSetAmount).toBeCalled();
  });
  it("should not call setAmount when a nonnumerical value is entered in the input", () => {
    const mockSetAmount = vi.fn();
    render(
      <CurrencyInput
        currencyOptions={mockCurrencyOptions}
        amount={0}
        setAmount={mockSetAmount}
        selectedCurrency={"foo"}
        setSelectedCurrency={vi.fn()}
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "hello" } });
    expect(mockSetAmount).not.toBeCalled();
  });
});
