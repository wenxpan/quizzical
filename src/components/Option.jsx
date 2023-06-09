import React from "react";

export default function Option(props) {
  const { answerText, isCorrect, isSelected } = props.items;

  const styles = {
    backgroundColor: isSelected ? "#D6DBF5" : "",
    border: isSelected ? "1px solid transparent" : "",
  };

  function checkStyles() {
    if (props.isChecked && isSelected) {
      return {
        backgroundColor: isCorrect ? "#94D7A2" : "#F8BCBC",
        opacity: isCorrect ? "1" : "0.5",
        border: "1px solid transparent",
      };
    } else if (props.isChecked && isCorrect) {
      return { backgroundColor: "#94D7A2", border: "1px solid transparent" };
    } else if (props.isChecked) {
      return { opacity: "0.5" };
    } else if (isSelected) {
      return { backgroundColor: "#D6DBF5", border: "1px solid transparent" };
    }
  }

  return (
    <button
      className="btn--options"
      style={checkStyles()}
      onClick={props.toggleSelect}
    >
      {answerText}
    </button>
  );
}
