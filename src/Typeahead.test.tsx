import React from "react";
import { render, screen } from "@testing-library/react";
import Typeahead from "./Typeahead";

// test("renders learn react link", () => {
//   // const linkElement = getByText(/learn react/i);
//   // const { getByText } = render(<Typeahead list={["thing"]} />);
//   render(<Typeahead list={["thing"]} />);
//   const input = screen.getByRole("textbox");
//   expect(input).toBeInTheDocument();
// });

describe("re", () => {
  it("should return true", () => {
    render(<Typeahead list={["thing"]} />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(true).toBeFalsy();
  });

  it("should return false", () => {
    render(<Typeahead list={["thing"]} />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(true).toBeFalsy();
  });
});
