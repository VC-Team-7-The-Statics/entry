import { Input01, Textarea, Button01 } from "@the-statics/shared-components";
import { useState } from "react";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import ApiService from "../services/Api";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";

const ApiInstance = new ApiService(axios);

function CoffeeFormPage() {
  const user = useSelector(selectUser);

  const navigate = useNavigate();
  const { userId } = useParams();

  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({
    price: "",
    name: "",
  });
  const [input, setInput] = useState({
    title: "",
    content: "",
  });

  useQuery("price", () => ApiInstance.API.get(`/user/${userId}/price`), {
    staleTime: Infinity,
    onSuccess: ({ data }) => {
      if (!data.success) {
        setError("가격을 불러오지 못했습니다.");
      }

      setUserInfo({
        price: data.price,
        name: data.name,
      });
    },
  });

  const { mutate } = useMutation(
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

  const handleChange = (type) => (e) => {
    setInput((prev) => ({ ...prev, [type]: e.target.value }));
  };

  const handleTitleChange = handleChange("title");
  const handleContentChange = handleChange("content");

  const handleSubmit = () => {
    const coffeeForm = {
      to: userId,
      from: user.id,
      title: input.title,
      content: input.content,
    };

    mutate(coffeeForm);
  };

  return (
    <div>
      <h1>커피챗 요청</h1>
      <span>
        <span className="username">{userInfo.name}</span> 님에게 커피챗 요청하기
      </span>
      <Input01
        placeholder="제목을 입력해주세요."
        onChange={handleTitleChange}
      />
      <Textarea
        placeholder="현재 겪고 있는 문제를 구체적으로 설명해주세요."
        onChange={handleContentChange}
      />
      <span>
        <span className="username"></span>님의 커피챗 가격은 {userInfo.price}원
        입니다
      </span>
      {error && <span>{error}</span>}
      <Button01 type="submit" onClick={handleSubmit}>
        커피챗 요청하기
      </Button01>
    </div>
  );
}

export default CoffeeFormPage;
