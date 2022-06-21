import { BrowserRouter } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import { unauthenticatedState } from "../test-utils/mockState";
import render, { screen } from "../test-utils/wrappedRender";

const setup = {
  render: () => {
    render(
      <BrowserRouter>
        <WelcomePage />
      </BrowserRouter>,
      { preloadedState: unauthenticatedState }
    );
  },
};

describe("WelcomePage", () => {
  test("로그인 하지 않았다면 웰컴 페이지를 보여줍니다.", () => {
    setup.render();

    const header = screen.getByText("Sinder");

    expect(header).toBeInTheDocument();
  });
});
