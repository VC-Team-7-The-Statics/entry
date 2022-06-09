import { Title } from "@the-statics/shared-components";
import { useEffect, useState } from "react";

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
      <Title value={languageBlock.language} />
      {stacks.map((stack, i) => (
        <div
          key={i}
          onClick={handleSelect}
          className={
            selectedStacks.includes(stack) ? "selected" : "not-selected"
          }
        >
          {stack}
        </div>
      ))}
    </>
  );
}

export default SelectLanguage;
