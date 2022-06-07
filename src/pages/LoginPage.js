import styles from "./LoginPage.module.scss";
import { Button, Input } from "@the-statics/shared-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Joi from "joi";
import axios from "axios";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";

import { selectUser, setUser } from "../features/user/userSlice";
import ApiService from "../services/Api";

const emailValidator = (email, helper) => {
  if (email.includes("gmail.com") || email.includes("naver.com")) {
    return helper.message("회사 메일이 아닙니다.");
  }

  if (!email.includes("@")) {
    return helper.message("이메일 형식이 아닙니다.");
  }

  return email;
};

const schema = Joi.object({
  email: Joi.string().custom(emailValidator).required().messages({
    "string.empty": `이메일을 입력해 주세요.`,
  }),
  password: Joi.string().min(3).required().messages({
    "string.empty": "비밀번호를 입력해 주세요.",
    "string.min": "비밀번호는 최소 3 자리 이상입니다.",
  }),
});

const ApiInstance = new ApiService(axios);

function LoginPage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = !!user.name;

    if (isLoggedIn) {
      navigate("/");
    }
  }, [user.name, navigate]);

  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const { data, refetch } = useQuery(
    "login",
    () => ApiInstance.login({ email: input.email, password: input.password }),
    { enabled: false }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = schema.validate(input);

    if (error) {
      return setError(error.details[0].message);
    }

    refetch();
  };

  useEffect(() => {
    if (data?.data.success) {
      const user = {
        id: data.data.user._id,
        name: data.data.user.name,
        email: data.data.user.email,
        location: data.data.user.location,
      };
      window.ReactNativeWebView.postMessage(`token ${data.data.token}`);
      dispatch(setUser(user));
    }

    if (data?.data.success === false) {
      setError("로그인 정보가 불일치 합니다.");
    }
  }, [data?.data.user, data?.data.success, data?.data.token, dispatch]);

  return (
    <div className={styles.LoginPage}>
      <img src="/icons/app-logo.png" alt="logo" className={styles.logo} />
      <form className={styles["login-form"]} onSubmit={handleSubmit}>
        <div className={styles.login}>
          <div className={styles.login__email}>
            <Input
              placeholder="이메일을 입력해 주세요"
              onChange={(e) =>
                setInput((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div className={styles.login__password}>
            <Input
              placeholder="비밀번호를 입력해 주세요"
              onChange={(e) =>
                setInput((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>
          {error && <span className={styles["error-message"]}>{error}</span>}
          <div className={styles.login__proceed}>
            <Button disabled={!input.email || !input.password}>
              로그인 하기
            </Button>
          </div>
        </div>
      </form>
      <div onClick={() => navigate(-1)}>뒤로</div>
    </div>
  );
}

export default LoginPage;
