import React from "react";
import Option from "./Option";

export default function Question(props) {
  const questionText = props.items.questionText;
  const optionsArray = props.items.options;
  const optionElements = optionsArray.map((option) => (
    <Option
      key={option.id}
      items={option}
      isChecked={props.isChecked}
      toggleSelect={(event) => props.toggleSelect(event, option.id)}
    />
  ));

  function createMarkup() {
    return { __html: questionText };
  }

  return (
    <>
      <h3
        className="question-text"
        dangerouslySetInnerHTML={{ __html: questionText }}
      />
      <div className="options--container">{optionElements}</div>
      <hr className="divider" />
    </>
  );
}
