import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";

test("<BlogForm /> updates parent state and calls onSubmit", () => {
  const createBlog = jest.fn();

  const component = render(<BlogForm createBlog={createBlog} />);

  const titleInput = component.container.querySelector(".title");
  const authorInput = component.container.querySelector(".author");
  const urlInput = component.container.querySelector(".url");
  const form = component.container.querySelector("form");

  fireEvent.change(titleInput, {
    target: { value: "The Man in the Middle" }
  });
  fireEvent.change(authorInput, {
    target: { value: "Middle Man" }
  });
  fireEvent.change(urlInput, {
    target: { value: "www.middle.com" }
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  console.log(createBlog.mock.calls, "createBlog.mock.calls");
  expect(createBlog.mock.calls[0][0].title).toBe("The Man in the Middle");
});
