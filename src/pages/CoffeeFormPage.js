import { Input01, Textarea, Button02 } from "@the-statics/shared-components";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import styles from "./CoffeeFormPage.module.scss";
import ApiService from "../services/Api";

const ApiInstance = new ApiService(axios);

function CoffeeFormPage() {
  const { userId } = useParams();

  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({
    price: "",
    name: "",
  });
  // const [input, setInput] = useState({
  //   title: "",
  //   content: "",
  // });

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

  // const { mutate } = useMutation(
  //   (coffeeForm) => ApiInstance.sendCoffeeForm({ ...coffeeForm }),
  //   {
  //     onSuccess: ({ data }) => {
  //       if (!data.success) {
  //         return setError(data.message);
  //       }

  //       navigate("/");
  //     },
  //     onError: () => {
  //       setError("네트워크 요청을 실패했습니다.");
  //     },
  //   }
  // );

  const handleChange = (type) => (e) => {
    // setInput((prev) => ({ ...prev, [type]: e.target.value }));
  };

  // const handleSubmit = () => {
  //   const coffeeForm = {
  //     to: userId,
  //     from: user.id,
  //     title: input.title,
  //     content: input.content,
  //   };

  //   mutate(coffeeForm);
  // };
  const handleSubmit = () => {
    /* 가맹점 식별코드 */
    const userCode = "imp32962813";

    /* 결제 데이터 정의하기 */
    const data = {
      pg: "payco", // PG사
      pay_method: "card", // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: 1000, // 결제금액
      name: "아임포트 결제 데이터 분석", // 주문명
      buyer_name: "홍길동", // 구매자 이름
      buyer_tel: "01012341234", // 구매자 전화번호
      buyer_email: "example@example", // 구매자 이메일
      buyer_addr: "신사동 661-16", // 구매자 주소
      buyer_postcode: "06018", // 구매자 우편번호
    };

    const params = {
      userCode, // 가맹점 식별코드
      data, // 결제 데이터
      type: "PAYMENT", // 결제와 본인인증 구분을 위한 필드
    };

    const paramsToString = JSON.stringify(params);

    window.ReactNativeWebView.postMessage(paramsToString);
  };

  return (
    <div className={styles["request-container"]}>
      <h1 className={styles.title}>커피챗 요청</h1>
      <div className={styles.content}>
        <span>
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
        <Button02 type="submit" onClick={handleSubmit}>
          커피챗 요청하기
        </Button02>
      </div>
    </div>
  );
}

export default CoffeeFormPage;
