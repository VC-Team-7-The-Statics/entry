import styles from "./UserCardLeftBar.module.scss";

function UserCardLeftBar({ name, company, languages, expertise }) {
  const languageCollection = [];
  const stackCollection = [];

  languages.forEach((obj) => {
    if (obj.stacks.length) {
      languageCollection.push(obj.name);
      obj.stacks.forEach((stack) => stackCollection.push(stack));
    }
  });

  return (
    <div className={styles["left-bar"]}>
      <div className={styles["left-bar__container"]}>
        <div className={styles["left-bar__container__text-box"]}>
          <span className={styles["left-bar__name"]}>{name}</span>
          <span>@{company}</span>
        </div>
        <div className={styles["left-bar__container__text-box"]}>
          <span>프로그래밍 언어</span>
          {languageCollection.map((language, i) => (
            <span className={styles.language} key={i}>
              {language}
            </span>
          ))}
        </div>
        <div className={styles["left-bar__container__text-box"]}>
          <span>스택</span>
          {stackCollection.map((stack, i) => (
            <span className={styles.stack} key={i}>
              {stack}
            </span>
          ))}
        </div>
      </div>
      <hr />
      <div className={styles["left-bar__container"]}>
        <div className={styles["left-bar__container__text-box"]}>
          <span className={styles["left-bar__name"]}>전문 분야</span>
        </div>
        <div className={styles["left-bar__container__text-box"]}>
          <span>{expertise}</span>
        </div>
      </div>
    </div>
  );
}

export default UserCardLeftBar;
