import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CurrencyChipCustom from "./CurrencyChipCustom";

describe("CurrencyChipCustom", () => {
  it("should render the component", () => {
    render(
      <CurrencyChipCustom
        currency="foo"
        showDropdownIcon={false}
        onClick={() => {}}
        isDisabled={false}
      />
    );
  });
  it("should have class disabled if disabled is true", () => {
    render(
      <CurrencyChipCustom
        currency="foo"
        showDropdownIcon={false}
        onClick={() => {}}
        isDisabled={true}
      />
    );
    const chip = screen.getByRole("button");
    expect(chip).toHaveClass("disabled");
  });
  it("should display currency avatar and name", () => {
    render(
      <CurrencyChipCustom
        currency="foo"
        showDropdownIcon={false}
        onClick={() => {}}
        isDisabled={false}
      />
    );
    const avatar = screen.getByTestId("currency-avatar");
    const currencyName = screen.getByTestId("currency-name");
    expect(avatar).toBeTruthy();
    expect(currencyName).toHaveTextContent("foo");
  });
  it("should display dropdown icon if showDropdownIcon is true", () => {
    render(
      <CurrencyChipCustom
        currency="foo"
        showDropdownIcon={false}
        onClick={() => {}}
        isDisabled={false}
      />
    );
    expect(screen.queryByRole("img")).toBeFalsy();

    render(
      <CurrencyChipCustom
        currency="foo"
        showDropdownIcon={true}
        onClick={() => {}}
        isDisabled={false}
      />
    );
    expect(screen.queryByRole("img")).toBeTruthy();
  });
  it("should call onClick when clicked and not disabled", () => {
    const mockOnClick = vi.fn();
    render(
      <CurrencyChipCustom
        currency="foo"
        showDropdownIcon={false}
        onClick={mockOnClick}
        isDisabled={false}
      />
    );
    const chip = screen.getByRole("button");
    fireEvent.click(chip);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
  it("should not call onClick when clicked and disabled", () => {
    const mockOnClick = vi.fn();
    render(
      <CurrencyChipCustom
        currency="foo"
        showDropdownIcon={false}
        onClick={mockOnClick}
        isDisabled={true}
      />
    );
    const chip = screen.getByRole("button");
    fireEvent.click(chip);

    expect(mockOnClick).toHaveBeenCalledTimes(0);
  });
});
