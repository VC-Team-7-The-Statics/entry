import { languages, unauthenticatedState } from "../test-utils/mockState";
import { BrowserRouter } from "react-router-dom";
import SignupPage from "../pages/SignupPage";
import render, { screen } from "../test-utils/wrappedRender";

const mockLanguages = languages.slice();

jest.mock("../hooks/auth.hooks", () => ({
  useSignUp: () => ({
    mutate: jest.fn(),
  }),
  useLanguageSample: () => ({
    data: {
      data: {
        languages: mockLanguages,
      },
    },
  }),
}));

const setup = {
  render: () => {
    render(
      <BrowserRouter>
        <SignupPage />
      </BrowserRouter>,
      { preloadedState: unauthenticatedState }
    );
  },
};

describe("SignupPage", () => {
  test("회원 정보 입력창과 언어 선택지가 보입니다.", () => {
    setup.render();

    screen.getByText("회원 등록");
    screen.getByPlaceholderText("이름을 입력해주세요.");
    screen.getByText("javascript");
    screen.getByText("react");
  });
});
