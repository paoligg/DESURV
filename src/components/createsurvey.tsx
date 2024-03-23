import { createRef, useEffect, useState } from 'react';
import SurveyQuestions from '@/types/surveyquestions';
import { useAccount, useWriteContract } from 'wagmi';
import { type WriteContractParameters } from '@wagmi/core'
import Question from './question';
import { surveysContract } from '@/contracts';

export default function CreateSurvey() {
    const [questions, setQuestions] = useState<SurveyQuestions[]>([]);
    const account = useAccount();
    const { writeContract } = useWriteContract();
    const handleQuestionChange = (index: number, question: string) => {
        const newQuestions = [...questions];
        newQuestions[index].question = question;
        setQuestions(newQuestions);
    };
    useEffect(() => {
        questions[questions.length - 1]?.questionRef.current?.focus();
    }, [questions.length]);
    const handleAddQuestion = () => {
        const newQuestions = [...questions];
        const newQuestion = {
            question: '',
            questionRef: createRef<HTMLInputElement>(),
            possibleAnswers: [],
        };
        newQuestions.push(newQuestion);
        setQuestions(newQuestions);
    };

    const handleSendSurvey = () => {
        const args= [
            questions
                .map(
                    (question) =>
                        `${question.question}@${question.possibleAnswers.join('|')}`,
                )
                .join(';'),
            BigInt(100),
            'description',
            'public_key',
            BigInt(questions.length),
        ];
        const variables : WriteContractParameters = {
            account: account.address,
            address: surveysContract.address,
            abi: surveysContract.abi,
            functionName: 'createSurvey',
            args,
            maxFeePerBlobGas: BigInt(10000),
            blobs: [],
            value: BigInt(1000),
        };
        const onSuccess =  (data: any) => {
            console.log(data);
        }
        const onError = (error: any) => {
            console.log(error);
        }
        const onSettled = () => {
            console.log("Transaction settled");
        }
        writeContract(variables,{
            onSuccess,
            onError,
            onSettled
        }
        );
    };

    return (
        <>
            <h1>Create a survey</h1>
            <div className="flex flex-row flex-wrap ">
                {questions.map((question, index) => (
                    <div key={index} className="flex flex-col p-4">
                        <input
                            className="bg-slate-950 text-center"
                            ref={question.questionRef}
                            value={question.question}
                            onChange={(event) =>
                                handleQuestionChange(index, event.target.value)
                            }
                        />
                        <Question
                            questions={questions}
                            setQuestions={setQuestions}
                            index={index}
                        />
                    </div>
                ))}
                <button onClick={() => handleAddQuestion()}>
                    Add question
                </button>
            </div>
            <button onClick={() => handleSendSurvey()}>Send Survey</button>
        </>
    );
}
