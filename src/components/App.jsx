import React from "react";
import Question from "./Question";
import { nanoid } from "nanoid";

export default function App() {
  const [questions, setQuestions] = React.useState([]);
  const [pageStatus, setPageStatus] = React.useState({
    cover: true,
    checked: false,
    refresh: false,
  });

  React.useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple"
    )
      .then((res) => res.json())
      .then((data) => {
        return data.results.map((item) => {
          const correctAnswer = item.correct_answer;
          const wrongAnsObjArray = item.incorrect_answers.map((wrongAns) => ({
            id: nanoid(),
            answerText: wrongAns,
            isCorrect: false,
            isSelected: false,
          }));
          const optionsArray = [
            {
              id: nanoid(),
              answerText: correctAnswer,
              isCorrect: true,
              isSelected: false,
            },
            ...wrongAnsObjArray,
          ].sort(() => Math.random() - 0.5);
          return {
            id: nanoid(),
            questionText: item.question,
            options: optionsArray,
          };
        });
      })
      .then((fetchedQues) => setQuestions(fetchedQues));
  }, [pageStatus.refresh]);

  function handleClick() {
    if (pageStatus.cover) {
      setPageStatus((prevState) => ({ ...prevState, cover: !prevState.cover }));
    } else if (!pageStatus.checked) {
      setPageStatus((prevState) => ({
        ...prevState,
        checked: !prevState.checked,
      }));
    } else {
      setPageStatus((prevState) => ({
        ...prevState,
        checked: !prevState.checked,
        refresh: !prevState.refresh,
      }));
    }
  }

  function toggleSelect(event, id) {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        return {
          ...question,
          options: question.options.map((option) =>
            option.id === id
              ? { ...option, isSelected: !option.isSelected }
              : option
          ),
        };
      })
    );
  }

  function checkCorrectAnswer() {
    const checkingArray = questions.map((question) =>
      question.options.map((option) => option.isCorrect && option.isSelected)
    );
    const correctNumbers = checkingArray.filter((option) =>
      option.includes(true)
    ).length;
    console.log(correctNumbers);
    return correctNumbers;
  }

  const coverElements = (
    <div className="cover">
      <h1 className="cover-heading">Quizzical</h1>
      <p className="cover-text">Answer 5 short questions!</p>
      <button className="btn--primary" onClick={handleClick}>
        Start quiz
      </button>
    </div>
  );

  const questionElements = (
    <>
      <div className="page-container">
        {questions.map((question) => (
          <Question
            key={question.id}
            items={question}
            toggleSelect={toggleSelect}
            isChecked={pageStatus.checked}
          />
        ))}
        <div className="results--container">
          {pageStatus.checked && (
            <h3>You scored {checkCorrectAnswer()}/5 correct answers</h3>
          )}
          <button className="btn--primary" onClick={handleClick}>
            {!pageStatus.checked ? "Check answers" : "Play again"}
          </button>
        </div>
      </div>
    </>
  );

  // const text = "playable character in &quot;Grand Theft Auto V&quot;?"
  // console.log(text.value)

  return <main>{pageStatus.cover ? coverElements : questionElements}</main>;
}
