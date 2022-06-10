import { Input01, Textarea, Button01 } from "@the-statics/shared-components";
import { useState } from "react";
import ApiService from "../services/Api";
import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const ApiInstance = new ApiService(axios);

function CoffeeFormPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  const coffeeForm = { title, content };

  const navigate = useNavigate();
  const mutation = useMutation(
    (coffeeForm) => ApiInstance.API.post("/coffee-form", { ...coffeeForm }),
    {
      onSuccess: ({ data }) => {
        if (!data.success) {
          return setError(data.message);
        }

        navigate("/");
      },
      onError: () => {
        setError("네트워크 요청을 실패했습니다.");
      },
    }
  );

  const onSubmit = (e) => {
    mutation.mutate({ ...coffeeForm });
  };

  const onInputChange = (e) => {
    if (e.target.id === "title") {
      setTitle(e.target.value);
    }

    if (e.target.id === "content") {
      setContent(e.target.value);
    }
  };

  return (
    <div>
      <h1>커피챗 요청</h1>
      <p>
        <span className="username"></span>에게 커피챗 요청하기
      </p>
      <Input01
        placeholder="제목을 입력해주세요."
        id={"title"}
        onChange={onInputChange}
      />
      <Textarea
        placeholder="현재 겪고 있는 문제를 구체적으로 설명해주세요."
        id={"content"}
        onChange={onInputChange}
      />
      <p>
        <span className="username"></span>님의 커피챗 가격은 5,000원 입니다
      </p>
      <Button01 type="submit" onClick={onSubmit}>
        커피챗 요청하기
      </Button01>
    </div>
  );
}

export default CoffeeFormPage;
