import { useSelector } from "react-redux";

import { selectUser } from "../features/user/userSlice";

function HomePage() {
  const user = useSelector(selectUser);

  const post = () => {
    if (window.isNativeApp) {
      window.ReactNativeWebView.postMessage("token wrong");
    }
  };

  return (
    <div>
      <h1>홈 페이지 입니다.</h1>
      <h3>Name: {user.name}</h3>
      <button onClick={post}>네이티브에서 토큰 지우기</button>
    </div>
  );
}

export default HomePage;
