import {
  Title,
  Input01,
  Select,
  Option,
  Checkboxes,
  Button01,
  Textarea,
} from "@the-statics/shared-components";
import { useEffect, useState } from "react";

function SignupPage() {
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

  const [programmingLanguage, setProgrammingLanguage] = useState([]);
  const [stacks, setStacks] = useState([]);
  // TODO
  // const [credentials, setCredentials] = useState({
  //   name: '',
  //   email: '',
  //   language: [],
  //   stack: [],
  // })
  // const [inputs, setInputs] = useState([
  //   { placeholder: "전문 분야를 입력해주세요" },
  // ]);
  const [languagesAndStacks, setLanguagesAndStacks] = useState([
    {
      placeholder: "사용하시는 프로그래밍 언어를 골라주세요.",
    },
  ]);
  const languagesArr = [];
  const stacksObj = {};
  LANGUAGES_MOCK.forEach((data) => {
    languagesArr.push(data.language);
    stacksObj[data.language] = data.stack;
  });

  useEffect(() => {
    for (let i = 0; i < LANGUAGES_MOCK.length; i++) {
      const item = LANGUAGES_MOCK[i];

      if (item.language === programmingLanguage) {
        setStacks((prev) => [item.stack]);
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [programmingLanguage]);

  const addProgrammingLanguageInput = () => {
    setLanguagesAndStacks((prev) => {
      const languagesAndStack = prev[prev.length - 1];

      return [...prev, languagesAndStack];
    });
  };

  const onSelectChange = (e) => {
    setProgrammingLanguage(e.target.value);
  };

  return (
    <div className="SignupPage">
      <Title value="회원 등록" />
      <h1 className="title">기본 정보</h1>
      <Input01 placeholder="이름을 입력해주세요." />
      <Input01 placeholder="회사를 입력해주세요." />
      <Input01 placeholder="회사 이메일을 입력해주세요." />
      <Input01 placeholder="비밀번호를 입력해주세요." />
      <Textarea
        placeholder={
          "전문 분야를 소개해주세요. 예) socket.io 이용한 채팅 기능 구현에 자신 있습니다."
        }
      />
      <h1 className="title">사진 등록</h1>
      <div className="image-container"></div>
      <Button01 type="button">사진 등록하기</Button01>
      <h1 className="title">기술</h1>
      <div className="langauages-and-stacks-container">
        {languagesAndStacks.map((languagesAndStack, index) => (
          <div key={index} className="languages-and-stacks">
            <Select
              defaultValue={languagesAndStack.placeholder}
              onChange={onSelectChange}
            >
              <Option value={languagesAndStack.placeholder} disabled></Option>
              {languagesArr.map((item, index) => (
                <Option key={index} value={item}></Option>
              ))}
            </Select>
            {stacks?.length && <Checkboxes values={stacks[0]} />}
          </div>
        ))}
        <Button01 onClick={addProgrammingLanguageInput}>
          프로그래밍 언어 추가하기
        </Button01>
      </div>
      <h1 className="title">내가 받고 싶은 커피챗 금액 (최소 5,000원)</h1>
      <Input01 placeholder="금액은 '원' 단위로 입력해주세요." />
      <Button01 type="submit">등록하기</Button01>
    </div>
  );
}

export default SignupPage;
