import { useState } from 'react';
import SurveyQuestion from '@/types/surveyquestion';
import { Reply } from './ReplySurveyComponent';

export default function chooseAnswer({
    replies,
    setReplies,
    index,
}: {
    replies: Reply[];
    setReplies: (reply: Reply[]) => void;
    index: number;
}) {
    const reply = replies[index];
    const inputStyle =
        'bg-white w-full cursor-pointer select-none peer-checked:bg-blue-500 py-2 px-4 rounded-md text-black';
    const setChoice = (choice: number) => {
        const newReplies = [...replies];
        newReplies[index] = {
            question: reply.question,
            choice: choice,
        };
        setReplies(newReplies);
    };
    const handleChangeAnswer = (answerIndex: number) => {
        setChoice(answerIndex);
    };
    return (
        <div className="flex w-[20vw] flex-col rounded-3xl bg-red-500 px-4 py-10 opacity-80 shadow-[20px_20px_20px_0px] shadow-black hover:bg-red-400">
            <h1 className="rounded-md  border border-white bg-transparent  p-2 text-center text-xl">
                {reply.question.question}
            </h1>
            <form className="flex w-full flex-col gap-4 p-4">
                {reply.question.possibleAnswers.map((answer, answerIndex) => (
                    <div
                        className="flex flex-grow flex-col items-center justify-center"
                        key={answerIndex}
                        onClick={() => handleChangeAnswer(answerIndex)}
                    >
                        <input
                            className="peer hidden w-full"
                            {...{ checked: reply.choice === answerIndex }}
                            value={answer}
                            type="radio"
                        />
                        <label htmlFor={answer} className={inputStyle}>
                            {answer}
                        </label>
                    </div>
                ))}
            </form>
        </div>
    );
}
