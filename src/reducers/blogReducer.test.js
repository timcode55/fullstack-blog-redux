import deepFreeze from "deep-freeze";
import blogReducer from "./blogReducer";

describe("bloglist reducer", () => {
  const initialState = [
    {
      title: "Walking in the Woods",
      author: "Tim",
      url: "www.montereywoods.com",
      likes: 0
    }
  ];

  test("should return a proper initial state when called with undefined state", () => {
    const state = {};
    const action = {
      type: "DO_NOTHING"
    };

    const newState = blogReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test("blog is added", () => {
    const action = {
      type: "ADD_BLOG"
    };
    const state = initialState;

    deepFreeze(state);
    const newState = blogReducer(state, action);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    });
  });
});
