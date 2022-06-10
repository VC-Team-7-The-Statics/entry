import styles from "./UserCardHeartIcon.module.scss";
import axios from "axios";
import { debounce } from "lodash";
import { useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";

import { selectUser } from "../features/user/userSlice";
import ApiService from "../services/Api";

const ApiInstance = new ApiService(axios);

function UserCardHeartIcon({ onError, userId }) {
  const user = useSelector(selectUser);

  const [image, setImage] = useState("./icons/white-heart.png");

  const { mutate } = useMutation(
    (body) => ApiInstance.API.post("/user/like", { ...body }),
    {
      onSuccess: ({ data }) => {
        if (!data.success) {
          setImage("./icons/white-heart.png");
          onError("요청에 실패했습니다");
        }
      },
      onError: () => {
        setImage("./icons/white-heart.png");
        onError("네트워크 요청에 실패했습니다");
      },
    }
  );

  const handleLike = () => {
    const requestBody = {
      from: user.id,
      to: userId,
    };

    setImage("./icons/white-heart-filled.png");
    mutate(requestBody);
  };

  return (
    <div
      className={styles["icon-container"]}
      onClick={debounce(handleLike, 500)}
    >
      <img
        src={image}
        alt="heart"
        className={styles["icon-container__heart"]}
      />
    </div>
  );
}

export default UserCardHeartIcon;
