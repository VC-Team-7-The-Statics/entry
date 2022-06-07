import "./LoginPage.scss";
import { Button, Input } from "@the-statics/shared-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginPage() {
  const [input, setInput] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="LoginPage">
      <h1>
        인풋 테스트: {input.email} - {input.password}
      </h1>
      <img src="/icons/app-logo.png" alt="logo" className="logo" />
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login">
          <div className="login__email">
            <Input
              placeholder="이메일을 입력해 주세요"
              onChange={(e) =>
                setInput((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div className="login__password">
            <Input
              placeholder="비밀번호를 입력해 주세요"
              onChange={(e) =>
                setInput((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>
          <div className="login__proceed">
            <Button>로그인 하기</Button>
          </div>
        </div>
      </form>
      <div onClick={() => navigate(-1)}>뒤로</div>
    </div>
  );
}

export default LoginPage;
