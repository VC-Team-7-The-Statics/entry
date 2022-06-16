import styles from "./SelectLanguage.module.scss";
import { useEffect, useState } from "react";

function SelectLanguage({ languageBlock, onSubmit }) {
  const [selectedStacks, setSelectedStacks] = useState([]);

  const stacks = languageBlock.stack.map((stack) => stack);

  const handleSelect = (e) => {
    const stack = e.target.innerText;

    if (selectedStacks.includes(stack)) {
      return setSelectedStacks((prev) => prev.filter((s) => s !== stack));
    }

    setSelectedStacks((prev) => [...prev, e.target.innerText]);
  };

  useEffect(() => {
    onSubmit(selectedStacks);
  }, [selectedStacks, onSubmit]);

  return (
    <>
      <h1 className={styles.language}>{languageBlock.language}</h1>
      <ul className={styles.stacks}>
        {stacks.map((stack, i) => (
          <li
            key={i}
            onClick={handleSelect}
            className={
              selectedStacks.includes(stack)
                ? `${styles.token} ${styles.selected}`
                : `${styles.token}`
            }
          >
            {stack}
          </li>
        ))}
      </ul>
    </>
  );
}

export default SelectLanguage;
