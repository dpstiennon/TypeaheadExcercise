import React from "react";
import { render, screen } from "@testing-library/react";
import Typeahead from "./Typeahead";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

//Note - had a devil of a time getting tests running with dependency incompatibilities.
//Eventually just update all dependencies to latest version

describe("<Typeahead>", () => {
  it("should show blank textbox by default", () => {
    render(<Typeahead list={["thing"]} />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("should show a dropdown list if you enter text", async () => {
    render(<Typeahead list={["thing1", "thing2"]} />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "t");
    expect(screen.queryAllByRole("button")).toHaveLength(2);
  });

  it("should show no list if no matching entries", async () => {
    render(<Typeahead list={["thing1", "thing2"]} />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "xxxx");
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("should show the dropdown even if leading space and case mismatch", async () => {
    render(<Typeahead list={["thing1", "thing2"]} />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "   Thi");
    expect(screen.queryAllByRole("button")).toHaveLength(2);
  });

  it("should populate the textbox if a list item clicked", async () => {
    render(<Typeahead list={["thing1", "thing2"]} />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "th");
    await userEvent.click(screen.queryAllByRole("button")[0]);
    expect(input).toHaveValue("thing1");
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("should tab between options", async () => {
    render(<Typeahead list={["thing1", "thing2"]} />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "th");
    userEvent.tab();
    expect(screen.queryAllByRole("button")[0]).toHaveFocus();
  });
});
