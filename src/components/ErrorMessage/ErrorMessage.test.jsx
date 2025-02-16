import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage", () => {
  it("should render the component", () => {
    render(<ErrorMessage />);
  });
  it("should display the title, subtitle, and footerMessage props", () => {
    const mockTitle = "foo title";
    const mockSubtitle = "foo subtitle";
    const mockFooterMessage = "foo footer";
    render(
      <ErrorMessage
        title={mockTitle}
        subtitle={mockSubtitle}
        footerMessage={mockFooterMessage}
      />
    );

    const title = screen.getByRole("heading");
    const subtitle = screen.getByRole("strong");
    const footer = screen.getByRole("paragraph");
    expect(title).toHaveTextContent(mockTitle);
    expect(subtitle).toHaveTextContent(mockSubtitle);
    expect(footer).toHaveTextContent(mockFooterMessage);
  });
});
