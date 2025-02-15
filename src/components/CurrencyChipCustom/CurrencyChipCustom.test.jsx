import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import CurrencyChipCustom from "./CurrencyChipCustom";

describe("CurrencyChipCustom", () => {
  it("should render the component", () => {
    render(
      <CurrencyChipCustom
        currency="foo"
        showDropdownIcon={true}
        onClick={() => {}}
        isDisabled={false}
      />
    );
    screen.debug();
  });
});
