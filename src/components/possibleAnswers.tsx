import { useEffect, useState } from "react";
import SurveyQuestions from "@/types/surveyquestions";
import {createRef} from "react";

export default function Answers({ questions, setQuestions, index }: { questions: SurveyQuestions[], setQuestions: (questions: SurveyQuestions[]) => void, index: number }) {
  const setAnswers = (answers: string[]) => {
    const newQuestions = [...questions];
    newQuestions[index].possibleAnswers = answers;
    setQuestions(newQuestions);
  }
  const getAnswers = () => {
    return [...questions[index].possibleAnswers];
  }
  const [isAddingAnswer, setIsAddingAnswer] = useState<boolean>(false);
  const newAnswerRef = createRef<HTMLInputElement>();

  const inputStyle = "bg-white py-2 px-4 rounded-md text-black";

  const handleChangeAnswer = ( answerIndex: number, answer: string) => {
    const newAnswers = getAnswers();
    newAnswers[answerIndex] = answer;
    setAnswers(newAnswers);
  }
  const handleNewAnswerBlur = (event : React.FocusEvent<HTMLInputElement, Element>) => {
    if(event.relatedTarget?.id == `add_button_${index}`)
    {
      newAnswerRef.current?.focus();
      return;
    }

    const inputValue = event.target.value;
    if (inputValue !== "") {
      const newAnswers = getAnswers();
      newAnswers.push(inputValue);
      setAnswers(newAnswers);
    }
      setIsAddingAnswer(false);
      console.log("blur");
  };
  const handleAddingAnswer = () => {
    if (!isAddingAnswer)
    setIsAddingAnswer(true);
    console.log("add");
  };
  useEffect(() => {
    if(isAddingAnswer)
        newAnswerRef.current?.focus();
  }, [isAddingAnswer]);

  return (
      <div className="p-4 flex flex-col gap-2">
        {getAnswers().map((answer, answerIndex) => (
          <input
          className={inputStyle}
            value={answer}
            key={answerIndex}
            onChange={(event) =>
              handleChangeAnswer(answerIndex, event.target.value)
            }
          />
        ))}
        {isAddingAnswer && (
          <input
          className={inputStyle}
            ref={newAnswerRef}
            onBlur={handleNewAnswerBlur}
          />
        )}
      <button className="bottom-2" id={`add_button_${index}`} onClick={() => handleAddingAnswer()}>
        Add possible answer
      </button>
    </div>
  );
}
