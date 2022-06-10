import styles from "./UserCardCoffeeIcon.module.scss";
import { useNavigate } from "react-router-dom";

function UserCardCoffeeIcon({ lastUserCardRef, userId }) {
  const navigate = useNavigate();

  return (
    <div
      className={styles["icon-container"]}
      onClick={() => navigate(`/coffee-form/${userId}`)}
      ref={lastUserCardRef}
    >
      <span>커피챗 요청하기</span>
    </div>
  );
}

export default UserCardCoffeeIcon;
