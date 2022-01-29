import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"

import Blog from "./Blog"

test("renders only blog author and title by default", () => {
  const blog = {
    title: "testing blog title",
    author: "liam carnahan",
    url: "test.com",
    likes: 10,
  }

  const component = render(<Blog blog={blog} />)

  const div = component.container.querySelector(".blog")
  expect(div).toHaveTextContent("testing blog title")

  expect(div).toHaveTextContent("liam carnahan")

  expect(div).not.toHaveTextContent("test.com")

  expect(div).not.toHaveTextContent("likes:")
})
