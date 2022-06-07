import "./WelcomePage.scss";
import { useNavigate } from "react-router-dom";
import { Button } from "@the-statics/shared-components";

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="WelcomePage">
      <img src="/icons/app-logo.png" alt="logo" className="logo" />
      <div className="selection">
        <div className="selection__login">
          <Button
            className="selection__login__button-container"
            onClick={() => navigate("/login")}
          >
            로그인 하기
          </Button>
        </div>
        <div className="selection__signup">
          <Button
            className="selection__signup__button-container"
            onClick={() => navigate("/signup")}
          >
            회원가입 하기
          </Button>
        </div>
      </div>
      {/* <button onClick={() => navigate("/login")}>To Home Page</button> */}
    </div>
  );
}

export default WelcomePage;
