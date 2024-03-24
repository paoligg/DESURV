import { useEffect, useState, RefObject } from 'react';
import SurveyQuestion from '@/types/surveyquestion';
import { createRef } from 'react';

export default function Answers({
    questions,
    setQuestions,
    index,
}: {
    questions: {
        survey: SurveyQuestion;
        questionRef: RefObject<HTMLInputElement>;
    }[];
    setQuestions: (
        questions: {
            survey: SurveyQuestion;
            questionRef: RefObject<HTMLInputElement>;
        }[],
    ) => void;
    index: number;
}) {
    const setAnswers = (answers: string[]) => {
        const newQuestions = [...questions];
        newQuestions[index].survey.possibleAnswers = answers;
        setQuestions(newQuestions);
    };
    const answers = questions[index].survey.possibleAnswers;
    const newAnswerRef = createRef<HTMLInputElement>();

    const inputStyle = 'bg-white py-2 px-4 rounded-md text-black';

    const handleChangeAnswer = (answerIndex: number, answer: string) => {
        const newAnswers = [...answers];
        newAnswers[answerIndex] = answer;
        setAnswers(newAnswers);
    };
    const handleNewAnswerBlur = (
        event: React.FocusEvent<HTMLInputElement, Element>,index:number
    ) => {
        const inputValue = event.target.value;
        if (inputValue === '') {
            const newAnswers = [...answers];
            newAnswers.splice(index, 1);
            setAnswers(newAnswers);
        }
    };
    useEffect(() => {
      if(newAnswerRef.current?.value === '')
        newAnswerRef.current?.focus();
    }, [newAnswerRef]);

    return (
        <div className="flex flex-col gap-2 p-4">
            {answers.map((answer, answerIndex) => (
                <input
                    className={inputStyle}
                    value={answer}
                    key={answerIndex}
                    ref={answerIndex == answers.length - 1 ? newAnswerRef : null}
                    onBlur={(event) => handleNewAnswerBlur(event,answerIndex)}
                    onChange={(event) =>
                        handleChangeAnswer(answerIndex, event.target.value)
                    }
                />
            ))}
            <button
                className="bottom-2"
                id={`add_button_${index}`}
                onClick={() => setAnswers([...answers, ''])}
            >
                Add possible answer
            </button>
        </div>
    );
}
