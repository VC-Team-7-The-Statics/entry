import styles from "./CoffeeLoading.module.scss";

function CoffeeLoading() {
  return (
    <div className={styles.container} data-testid="coffee-loading">
      <div className={styles["coffee-container"]}>
        <div className={styles.cup}>
          <div className={styles.coffee}></div>
        </div>
        <div className={styles.holder}></div>
        <div className={styles.holder2}> </div>
      </div>
    </div>
  );
}

export default CoffeeLoading;
