import styles from "./WelcomePage.module.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@the-statics/shared-components";
import { useSelector } from "react-redux";

import { selectUser } from "../features/user/userSlice";

function WelcomePage() {
  const user = useSelector(selectUser);

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = !!user.name;

    if (isLoggedIn) {
      navigate("/");
    }
  }, [user.name, navigate]);

  return (
    <div className={styles.WelcomePage}>
      <img src="/icons/app-logo.png" alt="logo" className={styles.logo} />
      <div className={styles.selection}>
        <div className={styles.selection__login}>
          <Button
            className={styles["selection__login__button-container"]}
            onClick={() => navigate("/login")}
          >
            로그인 하기
          </Button>
        </div>
        <div className={styles.selection__signup}>
          <Button
            className={styles["selection__signup__button-container"]}
            onClick={() => navigate("/signup")}
          >
            회원가입 하기
          </Button>
        </div>
      </div>
      <button onClick={() => navigate("/")}>To Home Page</button>
    </div>
  );
}

export default WelcomePage;
