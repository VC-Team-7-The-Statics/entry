import styles from "./UserCardHeartIcon.module.scss";

function UserCardHeartIcon() {
  return (
    <div className={styles["icon-container"]}>
      <img
        src="./icons/white-heart.png"
        alt="heart"
        className={styles["icon-container__heart"]}
      />
    </div>
  );
}

export default UserCardHeartIcon;
