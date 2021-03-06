import styles from "./LoginPage.module.scss";
import { Title, Button02, Input01 } from "@the-statics/shared-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { setUser } from "../features/user/userSlice";
import { LogInSchema } from "../services/Validation";
import { wait } from "../utils/helpers";
import { useLogin } from "../hooks/auth.hooks";

function LoginPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const { mutate } = useLogin({
    onSuccess: async ({ data }) => {
      if (!data.success) {
        return setError("로그인 정보가 불일치 합니다.");
      }

      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(`token ${data.token}`);
      }

      await wait(0.5);

      const user = {
        id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        image: data.user.image,
        languages: data.user.languages,
        expertise: data.user.expertise,
        price: data.user.price,
        likes: data.user.likes,
        match: data.user.match,
        location: data.user.location,
      };

      dispatch(setUser(user));
      navigate("/", { replace: true });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = LogInSchema.validate(input);

    if (error) {
      return setError(error.details[0].message);
    }

    mutate({ email: input.email, password: input.password });
  };

  return (
    <div className={styles.LoginPage}>
      <Title value="로그인" />
      <form className={styles["login-form"]} onSubmit={handleSubmit}>
        <div className={styles.login}>
          <div className={styles.login__email}>
            <Input01
              placeholder="이메일을 입력해 주세요"
              onChange={(e) =>
                setInput((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div className={styles.login__password}>
            <Input01
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              onChange={(e) =>
                setInput((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>
          <div className={styles["error-message-container"]}>
            {error && <span className={styles["error-message"]}>{error}</span>}
          </div>
          <div className={styles.login__proceed}>
            <Button02 disabled={!input.email || !input.password}>
              로그인 하기
            </Button02>
          </div>
        </div>
      </form>
      <div className={styles.back} onClick={() => navigate("/welcome")}>
        뒤로
      </div>
    </div>
  );
}

export default LoginPage;
