import React from "react";
import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("should render the component", () => {
    render(<App />);
  });
});
