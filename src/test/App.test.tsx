import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";

describe("App", () => {
  it("rennder movie app", () => {
    render(<App />);
    expect(screen.getByText(/Movie Application/)).toBeInTheDocument();
  });
});
