import styles from "./UserCard.module.scss";

import UserCardLeftBar from "./UserCardLeftBar";
import UserCardHeartIcon from "./UserCardHeartIcon";
import UserCardCoffeeIcon from "./UserCardCoffeeIcon";

function UserCard({
  name,
  company,
  languages,
  expertise,
  image,
  lastUserCardRef,
}) {
  return (
    <div className={styles.card} ref={lastUserCardRef}>
      <img className={styles.card__image} alt="user" src={image} />
      <UserCardLeftBar
        name={name}
        company={company}
        languages={languages}
        expertise={expertise}
      />
      <UserCardHeartIcon />
      <UserCardCoffeeIcon />
    </div>
  );
}

export default UserCard;
