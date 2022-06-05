import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome Page</h1>
      <span>로그인 하기</span>
      <span>가입 하기</span>
      {window.isNativeApp && <h3>this is on WebView</h3>}
      <button onClick={() => navigate("/")}>To Home Page</button>
      <a href="naver.com">naver</a>
    </div>
  );
}

export default WelcomePage;
