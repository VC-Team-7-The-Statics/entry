import {
  Title,
  Input01,
  Button01,
  Textarea,
} from "@the-statics/shared-components";
import { useCallback, useEffect, useMemo, useState } from "react";
import memoize from "fast-memoize";
import SelectLanguage from "../components/SelectLanguage";
import { useMutation } from "react-query";
import ApiService from "../services/Api";
import axios from "axios";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { SignUpSchema } from "../services/Validation";

const LANGUAGES_MOCK = [
  {
    language: "javascript",
    image: "",
    stack: ["react", "vue", "express", "nodejs", "nestjs", "tensorflow"],
  },
  {
    language: "python",
    image: "",
    stack: ["django", "flask", "tensorflow"],
  },
  {
    language: "java",
    image: "",
    stack: ["spring"],
  },
];

const ApiInstance = new ApiService(axios);

function SignupPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [base64, setBase64] = useState("");
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
    languages: {},
    expertise: "",
    price: "",
    location: {
      longitude: "",
      latitude: "",
    },
  });

  const img = useMemo(() => base64, [base64]);

  const mutation = useMutation(
    (credentials) => ApiInstance.API.post("/auth/signup", { ...credentials }),
    {
      onSuccess: ({ data }) => {
        if (!data.success) {
          return setError(data.message);
        }

        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(`token ${data.token}`);
        }

        const user = {
          id: data.user._id,
          name: data.user.name,
          email: data.user.email,
          location: data.user.location,
          token: data.token,
        };

        dispatch(setUser(user));
        navigate("/");
      },
      onError: () => {
        setError("네트워크 요청을 실패했습니다.");
      },
    }
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChange = useCallback(
    memoize((credential) => (e) => {
      setCredentials((prev) => ({ ...prev, [credential]: e.target.value }));
    }),
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleLanguageSelect = useCallback(
    memoize((language) => (stacks) => {
      setCredentials((prev) => ({
        ...prev,
        languages: { ...prev.languages, [language]: stacks },
      }));
    }),
    []
  );

  const handleSubmit = () => {
    const { error } = SignUpSchema.validate(credentials);

    if (error) {
      return setError(error.details[0].message);
    }

    mutation.mutate({ ...credentials, base64 });
  };

  const openGallery = () => {
    if (window.isNativeApp) {
      window.ReactNativeWebView.postMessage("open gallery");
    }
  };

  useEffect(() => {
    setBase64(window.base64);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.base64]);

  useEffect(() => {
    setCredentials((prev) => ({
      ...prev,
      location: { longitude: window.longitude, latitude: window.latitude },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.longitude, window.latitude]);

  return (
    <div className="SignupPage">
      <Title value="회원 등록" />
      <h1 className="title">기본 정보</h1>
      <Input01
        placeholder="이름을 입력해주세요."
        onChange={handleChange("name")}
      />
      <Input01
        placeholder="회사를 입력해주세요."
        onChange={handleChange("company")}
      />
      <Input01
        placeholder="회사 이메일을 입력해주세요."
        onChange={handleChange("email")}
      />
      <Input01
        placeholder="비밀번호를 입력해주세요."
        onChange={handleChange("password")}
      />
      <Textarea
        placeholder="전문 분야를 소개해주세요. 예) socket.io 이용한 채팅 기능 구현에 자신 있습니다."
        onChange={handleChange("expertise")}
      />
      <h1 className="title">사진 등록</h1>
      <Button01 type="button" onClick={openGallery}>
        사진 등록하기
      </Button01>
      <div className="image-container">
        {base64 && (
          <img
            src={`data:image/jpeg;base64,${img}`}
            style={{ width: "90%" }}
            alt="profile"
          />
        )}
      </div>
      <h1 className="title">기술</h1>
      <div className="langauages-and-stacks-container">
        {LANGUAGES_MOCK.map((languageBlock, i) => (
          <SelectLanguage
            languageBlock={languageBlock}
            key={i}
            onSubmit={handleLanguageSelect(languageBlock.language)}
          />
        ))}
      </div>
      <h1 className="title">내가 받고 싶은 커피챗 금액 (최소 5,000원)</h1>
      <Input01
        placeholder="금액은 '원' 단위로 입력해주세요."
        onChange={handleChange("price")}
      />
      <Title value={error} />
      <Button01 onClick={debounce(handleSubmit, 500)}>등록하기</Button01>
    </div>
  );
}

export default SignupPage;
