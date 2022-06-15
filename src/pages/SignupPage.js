import {
  Title,
  Input01,
  Button02,
  Textarea,
} from "@the-statics/shared-components";
import { useCallback, useEffect, useMemo, useState } from "react";
import memoize from "fast-memoize";
import axios from "axios";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./SignupPage.module.scss";
import SelectLanguage from "../components/SelectLanguage";
import { useMutation, useQuery } from "react-query";
import ApiService from "../services/Api";
import { setUser } from "../features/user/userSlice";
import { SignUpSchema } from "../services/Validation";

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
    (credentials) => ApiInstance.signup({ ...credentials }),
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
          image: data.user.image,
          languages: data.user.languages,
          expertise: data.user.expertise,
          price: data.user.price,
          likes: data.user.likes,
          match: data.user.match,
          location: data.user.location,
        };

        dispatch(setUser(user));
        navigate("/");
      },
      onError: () => {
        setError("네트워크 요청을 실패했습니다.");
      },
    }
  );

  const { data } = useQuery("languages", ApiInstance.getLanguages, {
    staleTime: Infinity,
  });

  const handleChange = (credential) => (e) => {
    setCredentials((prev) => ({ ...prev, [credential]: e.target.value }));
  };

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
    <div className={styles.SignupPage}>
      <div className={styles.title}>회원 등록</div>
      <h1 className={styles.subtitle}>기본 정보</h1>
      <div className={styles.content}>
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
        <h1 className={styles.subtitle}>사진 등록</h1>
        <div className={styles["image-container"]}>
          {!base64 && (
            <div className={styles["no-image"]}>
              <p className="notification">사진을 등록해주세요.</p>
            </div>
          )}
          {base64 && (
            <img
              src={`data:image/jpeg;base64,${img}`}
              style={{ width: "100%" }}
              alt="profile"
            />
          )}
        </div>
        <Button02 type="button" onClick={openGallery}>
          사진 등록하기
        </Button02>
        <h1 className={styles.subtitle}>기술</h1>
        <ul className={styles["langauages-and-stacks-container"]}>
          {data?.data.languages.map((languageBlock, i) => (
            <li key={i}>
              <SelectLanguage
                languageBlock={languageBlock}
                onSubmit={handleLanguageSelect(languageBlock.language)}
              />
            </li>
          ))}
        </ul>
        <p className={styles.paragraph}>
          내가 받고 싶은 커피챗 금액 (최소 5,000원)
        </p>
        <Input01
          placeholder="금액은 '원' 단위로 입력해주세요."
          onChange={handleChange("price")}
        />
        <Title value={error} />
        <Button02 onClick={debounce(handleSubmit, 500)}>등록하기</Button02>
      </div>
    </div>
  );
}

export default SignupPage;
