import styles from "./UserCardHeartIcon.module.scss";
import { debounce } from "lodash";
import { useState } from "react";
import { useSelector } from "react-redux";

import { selectUser } from "../features/user/userSlice";
import { useLike } from "../hooks/auth.hooks";
import assets from "../constants/assets";

function UserCardHeartIcon({ onError, userId }) {
  const user = useSelector(selectUser);

  const [liked, setLiked] = useState(user.likes.includes(userId));
  const [image, setImage] = useState(
    user.likes.includes(userId) ? assets.FILLED_HEART : assets.EMPTY_HEART
  );

  const { mutate } = useLike({
    onSuccess: ({ data }) => {
      if (!data.success) {
        setImage(assets.EMPTY_HEART);
        setLiked(false);
        onError("요청에 실패했습니다");
      }
    },
    onError: () => {
      setImage(assets.EMPTY_HEART);
      setLiked(false);
      onError("네트워크 요청에 실패했습니다");
    },
  });

  const handleLike = () => {
    const requestBody = {
      from: user.id,
      to: userId,
    };

    setImage(assets.FILLED_HEART);
    setLiked(true);
    !liked && mutate(requestBody);
  };

  return (
    <div
      className={styles["icon-container"]}
      onClick={debounce(handleLike, 150)}
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
