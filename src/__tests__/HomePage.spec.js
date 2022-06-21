import { BrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import {
  authenticatedState,
  infiniteNoUsers,
  infiniteUsers,
} from "../test-utils/mockState";
import render, { screen } from "../test-utils/wrappedRender";
import * as userHooks from "../hooks/user.hooks";
import * as authHooks from "../hooks/auth.hooks";
import "../__mocks__/intersectionObserverMock";

const mockInfiniteUsers = infiniteUsers.slice();
const mockInfiniteNoUsers = infiniteNoUsers.slice();

const setup = {
  render: () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>,
      { preloadedState: authenticatedState }
    );
  },
};

describe("HomePage", () => {
  test("로딩중이라면 로딩 컴포넌트를 보여줍니다.", () => {
    jest.spyOn(userHooks, "useInfiniteUsers").mockReturnValue({
      isLoading: true,
      data: {
        pages: [],
      },
      hasNextPage: jest.fn(),
      fetchNextPage: jest.fn(),
      refetch: jest.fn(),
    });

    setup.render();

    screen.getByTestId("coffee-loading");
  });

  test("로딩이 끝났다면 추천하는 유저를 보여줍니다.", () => {
    jest.spyOn(userHooks, "useInfiniteUsers").mockReturnValue({
      isLoading: false,
      data: {
        pages: mockInfiniteUsers,
      },
      hasNextPage: jest.fn(),
      fetchNextPage: jest.fn(),
      refetch: jest.fn(),
    });

    jest.spyOn(authHooks, "useLike").mockReturnValue({
      mutate: jest.fn(),
    });

    setup.render();

    screen.getByText("test-name-1");
    screen.getByText("test-name-2");
  });

  test("추천할 유저가 없다면 다시 불러오기 버튼이 보입니다.", () => {
    jest.spyOn(userHooks, "useInfiniteUsers").mockReturnValue({
      isLoading: false,
      data: {
        pages: mockInfiniteNoUsers,
      },
      hasNextPage: jest.fn(),
      fetchNextPage: jest.fn(),
      refetch: jest.fn(),
    });

    setup.render();

    screen.getByText("다시 불러오기");
  });
});
