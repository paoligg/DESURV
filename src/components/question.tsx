import { useEffect, useState } from "react";
import SurveyQuestions from "@/types/surveyquestions";
import React from "react";

export default function Question({ questions, setQuestions, index }: { questions: SurveyQuestions[], setQuestions: (questions: SurveyQuestions[]) => void, index: number }) {
  const [isAddingAnswer, setIsAddingAnswer] = useState<boolean>(false);
  const setAnswers = (answers: string[]) => {
    const newQuestions = [...questions];
    newQuestions[index].possibleAnswers = answers;
    setQuestions(newQuestions);
  }
  const getAnswers = () => {
    return [...questions[index].possibleAnswers];
  }
  const newAnswerRef = React.createRef<HTMLInputElement>();
  const handleChangeAnswer = ( answerIndex: number, answer: string) => {
    const newAnswers = getAnswers();
    newAnswers[answerIndex] = answer;
    setAnswers(newAnswers);
  }
  const handleNewAnswerBlur = (inputValue: string) => {
    const newAnswers = getAnswers();
    if (inputValue !== "") {
      newAnswers.push(inputValue);
    }
    setIsAddingAnswer(false);
    setAnswers(newAnswers);
  };
  const handleAddingAnswer = () => {
    setIsAddingAnswer(true);
  };
  useEffect(() => {
    if(isAddingAnswer)
        newAnswerRef.current?.focus();
  }, [isAddingAnswer]);

  return (
    <div>
      <div className="p-4 flex flex-col gap-2">
        {getAnswers().map((answer, answerIndex) => (
          <input
          className="bg-slate-950"
            value={answer}
            key={answerIndex}
            onChange={(event) =>
              handleChangeAnswer(answerIndex, event.target.value)
            }
          />
        ))}
        {isAddingAnswer && (
          <input
          className="bg-slate-950"
            ref={newAnswerRef}
            onBlur={(event) => handleNewAnswerBlur(event.target.value)}
          />
        )}
      </div>

      <button onClick={() => handleAddingAnswer()}>
        Add possible answer
      </button>
    </div>
  );
}
