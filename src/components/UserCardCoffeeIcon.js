import styles from "./UserCardCoffeeIcon.module.scss";
import { useNavigate } from "react-router-dom";

function UserCardCoffeeIcon({ lastUserCardRef }) {
  const navigate = useNavigate();

  return (
    <div
      className={styles["icon-container"]}
      onClick={() => navigate("/coffee-form")}
      ref={lastUserCardRef}
    >
      <span>커피챗 요청하기</span>
    </div>
  );
}

export default UserCardCoffeeIcon;
