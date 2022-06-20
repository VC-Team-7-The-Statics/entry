import { configureStore } from "@reduxjs/toolkit";
import { render as RTLRender } from "@testing-library/react";
import { Provider } from "react-redux";

import userSlice from "../features/user/userSlice";

function render(
  component,
  {
    preloadedState,
    store = configureStore({
      reducer: { user: userSlice },
      preloadedState: { user: preloadedState },
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return RTLRender(component, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";

export default render;
