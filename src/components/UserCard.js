import styles from "./UserCard.module.scss";

import UserCardLeftBar from "./UserCardLeftBar";
import UserCardHeartIcon from "./UserCardHeartIcon";
import UserCardCoffeeIcon from "./UserCardCoffeeIcon";
import { useState } from "react";

function UserCard({
  name,
  company,
  languages,
  expertise,
  image,
  userId,
  lastUserCardRef,
}) {
  const [error, setError] = useState("");

  return (
    <div className={styles.card} ref={lastUserCardRef}>
      <img className={styles.card__image} alt="user" src={image} />
      <div className={styles.content}>
        <UserCardLeftBar
          name={name}
          company={company}
          languages={languages}
          expertise={expertise}
        />
        <UserCardHeartIcon onError={setError} userId={userId} />
        <UserCardCoffeeIcon userId={userId} />
        {error && (
          <div className={styles.card__error}>
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserCard;
