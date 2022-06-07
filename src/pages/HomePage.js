import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const sendToken = () => {
    if (window.isNativeApp) {
      window.ReactNativeWebView.postMessage("token: some-token??");
    }
  };

  return (
    <div>
      <h1>home page screens</h1>
      {window.isNativeApp && <h3>this is on WebView</h3>}
      <button onClick={() => navigate("/welcome")}>To Welcome Page</button>
      <button onClick={sendToken}>SEND TOKEN TO NATIVE</button>
    </div>
  );
}

export default HomePage;
