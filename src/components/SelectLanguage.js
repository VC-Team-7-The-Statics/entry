import { Title } from "@the-statics/shared-components";
import { useEffect, useState } from "react";
import styles from "../pages/SignupPage.module.scss";

function SelectLanguage({ languageBlock, onSubmit }) {
  const [selectedStacks, setSelectedStacks] = useState([]);

  const stacks = languageBlock.stack.map((stack) => stack);

  const handleSelect = (e) => {
    const stack = e.target.innerText;

    if (selectedStacks.includes(stack)) {
      setSelectedStacks((prev) => prev.filter((s) => s !== stack));
    }

    setSelectedStacks((prev) => [...prev, e.target.innerText]);
  };

  useEffect(() => {
    onSubmit(selectedStacks);
  }, [selectedStacks, onSubmit]);

  return (
    <>
      <Title
        value={languageBlock.language}
        className={styles["language-title"]}
      />
      <ul className="stacks-container">
        {stacks.map((stack, i) => (
          <li
            key={i}
            onClick={handleSelect}
            className={
              selectedStacks.includes(stack) ? "selected" : "not-selected"
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
