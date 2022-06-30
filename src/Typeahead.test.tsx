import React from "react";
import { render, screen } from "@testing-library/react";
import Typeahead from "./Typeahead";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

// test("renders learn react link", async () => {
//   // const linkElement = getByText(/learn react/i);
//   const { getByRole } = render(<Typeahead list={["thing"]} />);
//   // render(<Typeahead list={["thing"]} />);
//   const input = getByRole("textbox");
//   await userEvent.type(input, 'c')
//   expect(input).
// });

describe("<Typeahead>", () => {
  it("should show blank textbox by default", () => {
    render(<Typeahead list={["thing"]} />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("should show a dropdown list if you enter text", () => {});

  it("should return false", () => {
    render(<Typeahead list={["thing"]} />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(false).toBeFalsy();
  });
});
