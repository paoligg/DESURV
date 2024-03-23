import { createRef, useEffect, useState } from 'react';
import SurveyQuestions from '@/types/surveyquestions';
import { useAccount, useWriteContract } from 'wagmi';
import { type WriteContractParameters } from '@wagmi/core'
import Answers from './possibleAnswers';
import { surveysContract } from '@/contracts';

export default function CreateSurvey() {
    const [questions, setQuestions] = useState<SurveyQuestions[]>([]);
    const [maxResponse, setMaxResponse] = useState<number>(0);
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
            BigInt(maxResponse),
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
        <div className='flex flex-col gap-8 justify-center items-center'>
            <h1>Create a survey</h1>
            <div className="flex flex-row flex-wrap p-4 gap-8">
                {questions.map((question, index) => (
                    <div key={index} className="flex flex-col px-4 py-10 opacity-80 shadow-[20px_20px_20px_0px] shadow-black bg-red-500 rounded-3xl hover:bg-red-400">
                        <input
                            className="bg-transparent  border border-white text-center  p-2 text-xl rounded-md"
                            ref={question.questionRef}
                            value={question.question}
                            onChange={(event) =>
                                handleQuestionChange(index, event.target.value)
                            }
                        />
                        <Answers
                            questions={questions}
                            setQuestions={setQuestions}
                            index={index}
                        />
                    </div>
                ))}
                <button className='text-purple-800 font-bold text-xl' onClick={() => handleAddQuestion()}>
                    Add question
                </button>
            </div>
                <input className='rounded-2xl text-black border border-purple-800 py-2 px-4' type="number" value={maxResponse} onChange={(event) => setMaxResponse(parseInt(event.target.value))} />
            <button className='rounded-2xl text-black border border-purple-800 p-2' onClick={() => handleSendSurvey()}>Send Survey</button>
        </div>
    );
}
