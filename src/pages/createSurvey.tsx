import { createRef, useEffect, useState, RefObject } from 'react';
import SurveyQuestion from '@/types/surveyquestion';
import { useAccount, useWriteContract } from 'wagmi';
import { type WriteContractParameters } from '@wagmi/core';
import Answers from '@/components/possibleAnswers';
import { surveysContract } from '@/contracts';
import RetriveData from '@/components/retrievedata';

export default function CreateSurveyComponent() {
    const newQuestion = {
        questionRef: createRef<HTMLInputElement>(),
        survey: {
            question: '',
            possibleAnswers: [],
        },
    };
    const [questions, setQuestions] = useState<
        { survey: SurveyQuestion; questionRef: RefObject<HTMLInputElement> }[]
    >([newQuestion]);
    const [maxResponse, setMaxResponse] = useState<number>(0);
    const [Reward, setReward] = useState<number>(0);
    const [description, setDescription] = useState<string>('');
    const [company, setCompany] = useState<string>('');
    const account = useAccount();
    const { writeContract } = useWriteContract();
    const handleQuestionChange = (index: number, question: string) => {
        const newQuestions = [...questions];
        newQuestions[index].survey.question = question;
        setQuestions(newQuestions);
    };
    useEffect(() => {
        questions[questions.length - 1]?.questionRef.current?.focus();
    }, [questions.length]);
    const handleAddQuestion = () => {
        const newQuestions = [...questions];
        newQuestions.push(newQuestion);
        setQuestions(newQuestions);
    };

    const handleSendSurvey = () => {
        const args = [
            questions
                .map(
                    (question) =>
                        `${question.survey.question}@${question.survey.possibleAnswers.join('|')}`,
                )
                .join(';'),
            BigInt(maxResponse),
            description,
            'public_key',
            BigInt(questions.length),
            company,
        ];
        const variables: WriteContractParameters = {
            account: account.address,
            address: surveysContract.address,
            abi: surveysContract.abi,
            functionName: 'createSurvey',
            args,
            maxFeePerBlobGas: BigInt(Reward),
            blobs: [],
            value: BigInt(1000),
        };
        const onSuccess = (data: any) => {
            console.log(data);
        };
        const onError = (error: any) => {
            console.log(error);
        };
        const onSettled = () => {
            console.log('Transaction settled');
        };
        writeContract(variables, {
            onSuccess,
            onError,
            onSettled,
        });
    };

    return (
        <div className="flex flex-col items-center justify-center gap-8">
            <h1>Create a survey</h1>
            <div className="flex flex-row flex-wrap items-stretch justify-center gap-8 p-4">
                {questions.map((question, index) => (
                    <div
                        key={index}
                        className="flex h-full flex-col rounded-3xl bg-red-500 px-4 py-10 opacity-80 shadow-[20px_20px_20px_0px] shadow-black hover:bg-red-400"
                    >
                        <input
                            className="rounded-md  border border-white bg-transparent  p-2 text-center text-xl"
                            ref={question.questionRef}
                            value={question.survey.question}
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
                <button
                    disabled={
                        questions[questions.length - 1].survey.question == '' ||
                        questions[questions.length - 1].survey.possibleAnswers
                            .length == 0
                    }
                    className="text-xl font-bold text-purple-800 disabled:opacity-50"
                    onClick={() => handleAddQuestion()}
                >
                    Add question
                </button>
            </div>
            <div className="flex w-1/3 flex-col gap-4">
                <div className="flex flex-col text-black">
                    <label className="-mb-1 ml-2">Max participants</label>
                    <input
                        className="rounded-2xl border border-purple-800 px-4 py-2 text-black"
                        type="number"
                        value={maxResponse}
                        onChange={(event) =>
                            setMaxResponse(parseInt(event.target.value))
                        }
                    />
                </div>
                <div className="flex flex-col text-black">
                    <label className="-mb-1 ml-2">Reward</label>
                    <input
                        className="rounded-2xl border border-purple-800 px-4 py-2 text-black"
                        type="number"
                        value={Reward}
                        onChange={(event) =>
                            setReward(parseInt(event.target.value))
                        }
                    />
                </div>
                <textarea
                    value={description}
                    className="h-[15vh] rounded-2xl border border-purple-800 p-2 text-black"
                    placeholder="Description"
                    onChange={(event) => setDescription(event.target.value)}
                />
                <input
                    className="rounded-2xl border border-purple-800 p-2 text-black"
                    type="text"
                    value={company}
                    placeholder="Company"
                    onChange={(event) => setCompany(event.target.value)}
                />
            </div>
            <button
                className="rounded-2xl border border-purple-800 p-2 text-black"
                onClick={() => handleSendSurvey()}
            >
                Send Survey
            </button>
            <div>
                <RetriveData/>
            </div>
        </div>
    );
}
