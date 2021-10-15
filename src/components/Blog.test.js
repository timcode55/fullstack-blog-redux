import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Blog from "./Blog";

test("clicking the button calls event handler once", () => {
  const blog = {
    title: "Will This New Trick Work?"
  };

  const mockHandler = jest.fn();

  const component = render(<Blog blog={blog} addLikes={mockHandler} />);

  const button = component.getByText("Like");
  fireEvent.click(button);
  console.log(mockHandler.mock.calls, "***********");
  expect(mockHandler.mock.calls).toHaveLength(1);
});

test("renders content", () => {
  const blog = {
    title: "Having fun in the sun",
    author: "Fun man"
  };

  const component = render(<Blog blog={blog} />);

  component.debug();

  expect(component.container).toHaveTextContent("Having fun in the sun");
  expect(component.container).toHaveTextContent("Fun man");

  const element = component.getByText("Having fun in the sun");
  expect(element).toBeDefined();

  // method 3
  const div = component.container.querySelector(".blog");
  expect(div).toHaveTextContent("Having fun in the su");
  console.log(prettyDOM(div));
});
