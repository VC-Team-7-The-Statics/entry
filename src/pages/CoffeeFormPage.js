import { Input01, Textarea, Button02 } from "@the-statics/shared-components";
import { useState } from "react";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./CoffeeFormPage.module.scss";
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

  useQuery("price", ApiInstance.getUserCoffeePrice(userId), {
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
    (coffeeForm) => ApiInstance.sendCoffeeForm({ ...coffeeForm }),
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
    <div className={styles["request-container"]}>
      <h1 className={styles.title}>커피챗 요청</h1>
      <div className={styles.content}>
        <span className={styles.subtitle}>
          <span className="username">{userInfo.name}</span> 님에게 커피챗
          요청하기
        </span>
        <div className="input-wrapper">
          <Input01
            placeholder="제목을 입력해주세요."
            onChange={handleChange("title")}
          />
        </div>
        <div className="textarea-wrapper">
          <Textarea
            placeholder="현재 겪고 있는 문제를 구체적으로 설명해주세요."
            onChange={handleChange("content")}
          />
        </div>
        <span className={styles["price-wrapper"]}>
          <span className="username">{userInfo.name}</span> 님의 커피챗 가격은{" "}
          {userInfo.price}원 입니다
        </span>
        {error && <span>{error}</span>}
        <div className={styles["button-container"]}>
          <Button02 type="submit" onClick={handleSubmit}>
            커피챗 요청하기
          </Button02>
        </div>
      </div>
    </div>
  );
}

export default CoffeeFormPage;
