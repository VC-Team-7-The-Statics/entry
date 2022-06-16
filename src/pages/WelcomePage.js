import styles from "./WelcomePage.module.scss";
import { useNavigate } from "react-router-dom";
import { Button01, Button02 } from "@the-statics/shared-components";

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className={styles.WelcomePage}>
      <div className={styles["intro-container"]}>
        <div className={styles["logo-container"]}>
          <img
            src="../../icons/sinder-logo.png"
            alt="sinder logo"
            width="300px"
          />
        </div>
        <div className={styles["title-container"]}>
          <h1 className={styles.title}>Sinder</h1>
        </div>
        <div className={styles["subtitle-container"]}>
          <h2 className={styles.subtitle}>
            A cup of coffee with local developers
          </h2>
        </div>
      </div>
      <div className={styles.selection}>
        <div className={styles.selection__login}>
          <Button02
            className={styles["selection__login__button-container"]}
            onClick={() => navigate("/login")}
          >
            로그인 하기
          </Button02>
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
    </div>
  );
}

export default WelcomePage;
