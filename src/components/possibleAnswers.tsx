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
    const getAnswers = () => {
        return [...questions[index].survey.possibleAnswers];
    };
    const [isAddingAnswer, setIsAddingAnswer] = useState<boolean>(false);
    const newAnswerRef = createRef<HTMLInputElement>();

    const inputStyle = 'bg-white py-2 px-4 rounded-md text-black';

    const handleChangeAnswer = (answerIndex: number, answer: string) => {
        const newAnswers = getAnswers();
        newAnswers[answerIndex] = answer;
        setAnswers(newAnswers);
    };
    const handleNewAnswerBlur = (
        event: React.FocusEvent<HTMLInputElement, Element>,
    ) => {
        const inputValue = event.target.value;
        if (inputValue !== '') {
            const newAnswers = getAnswers();
            newAnswers.push(inputValue);
            setAnswers(newAnswers);
        }
        if (
            event.relatedTarget?.id == `add_button_${index}` &&
            newAnswerRef.current
        ) {
            newAnswerRef.current?.focus();
            newAnswerRef.current.value = '';
        } else setIsAddingAnswer(false);
        console.log('blur');
    };
    const handleAddingAnswer = () => {
        if (!isAddingAnswer) setIsAddingAnswer(true);
        console.log('add');
    };
    useEffect(() => {
        if (isAddingAnswer) newAnswerRef.current?.focus();
    }, [isAddingAnswer]);

    return (
        <div className="flex flex-col gap-2 p-4">
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
            {(isAddingAnswer || getAnswers().length < 1) && (
                <input
                    className={inputStyle}
                    ref={newAnswerRef}
                    onBlur={handleNewAnswerBlur}
                />
            )}
            <button
                className="bottom-2"
                id={`add_button_${index}`}
                onClick={() => handleAddingAnswer()}
            >
                Add possible answer
            </button>
        </div>
    );
}
