import styles from "./WelcomePage.module.scss";
import { useNavigate } from "react-router-dom";

import { Button01 } from "@the-statics/shared-components";

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className={styles.WelcomePage}>
      <img src="/icons/app-logo.png" alt="logo" className={styles.logo} />
      <div className={styles.selection}>
        <div className={styles.selection__login}>
          <Button01
            className={styles["selection__login__button-container"]}
            onClick={() => navigate("/login")}
          >
            로그인 하기
          </Button01>
        </div>
        <div className={styles.selection__signup}>
          <Button01
            className={styles["selection__signup__button-container"]}
            onClick={() => navigate("/signup")}
          >
            회원가입 하기
          </Button01>
        </div>
      </div>
      <button onClick={() => navigate("/")}>To Home Page</button>
    </div>
  );
}

export default WelcomePage;
