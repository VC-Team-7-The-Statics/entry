import styles from "./UserCardHeartIcon.module.scss";
import axios from "axios";
import { debounce } from "lodash";
import { useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";

import { selectUser } from "../features/user/userSlice";
import ApiService from "../services/Api";

const ApiInstance = new ApiService(axios);

const emptyHeart = "./icons/white-heart.png";
const filledHeart = "./icons/white-heart-filled.png";

function UserCardHeartIcon({ onError, userId }) {
  const user = useSelector(selectUser);

  const [liked, setLiked] = useState(user.likes.includes(userId));
  const [image, setImage] = useState(
    user.likes.includes(userId) ? filledHeart : emptyHeart
  );

  const { mutate } = useMutation((body) => ApiInstance.likeUser({ ...body }), {
    onSuccess: ({ data }) => {
      if (!data.success) {
        setImage(emptyHeart);
        setLiked(false);
        onError("요청에 실패했습니다");
      }
    },
    onError: () => {
      setImage(emptyHeart);
      setLiked(false);
      onError("네트워크 요청에 실패했습니다");
    },
  });

  const handleLike = () => {
    const requestBody = {
      from: user.id,
      to: userId,
    };

    setImage(filledHeart);
    setLiked(true);
    !liked && mutate(requestBody);
  };

  return (
    <div
      className={styles["icon-container"]}
      onClick={debounce(handleLike, 250)}
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
