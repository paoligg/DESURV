import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { encryptMessage, publicKeyPem, pemToPublicKey, arrayBufferToBase64 } from './encrypt_message';
import { surveysContract } from '@/contracts';
import SurveyQuestion from '@/types/surveyquestion';
import ChooseAnswer from './chooseAnswer';
import { useEffect, useState } from 'react';

export interface Reply{
    question: SurveyQuestion;
    choice: number;
}

export default function replySurveyComponent({ surveyID }: { surveyID: number }) {
    console.log('surveyId',surveyID);
    const account = useAccount();
    const { data: survey } = useReadContract({
        abi: surveysContract.abi,
        address: surveysContract.address,
        functionName: 'surveys',
        args: [BigInt(surveyID)],
    });
    const { writeContract } = useWriteContract();
    const [replies,setReplies] = useState<Reply[]>([]);
    useEffect(() => {
        console.log('test')
    console.log(survey);
        if(replies.length === 0 && survey !== undefined){
            const newReplies  : Reply[]= [];
        const surveyData = survey[4];
        const items = surveyData.split(';');
        items.forEach((item) => {
            const [question, answers] = item.split('@');
            newReplies.push({question : { question, possibleAnswers: answers.split('|') }, choice : -1});
        });
        console.log('replies',newReplies);
        setReplies(newReplies);
    }
    }, [survey]);
    const hashAnswers = async () => {
        const joinedAnswers = replies.map((reply) => reply.question.possibleAnswers[reply.choice]).join('|');
        const publicKey = await pemToPublicKey(publicKeyPem);
        const hash = await encryptMessage(publicKey,joinedAnswers);
        return arrayBufferToBase64(hash);
    }
    const handleSubmit = async () => {
        writeContract(
            {
                account: account.address,
                address: surveysContract.address,
                abi: surveysContract.abi,
                functionName: 'answerSurvey',
                args: [BigInt(surveyID), await hashAnswers()],
                maxFeePerBlobGas: BigInt(10000),
                blobs: [],
            },
            {
                onSuccess: (data: any) => {
                    console.log(data);
                },
                onSettled: (data: any) => {
                    console.log(data);
                },
                onError: (error: any) => {
                    console.log(error);
                },
            },
        );

        console.log(replies);
        console.log('Submit');
    };

    return (
        <div className="flex flex-col items-center justify-center gap-8">
            <h1>Reply Survey</h1>
            <div className="flex flex-row flex-wrap justify-center gap-8 p-4">
                {replies.map((reply, index) => (
                    <ChooseAnswer key={index} replies={replies} index={index} setReplies={setReplies}/>
                ))}
            </div>
            <button
                className="rounded-2xl border border-purple-800 px-4 py-2 text-black"
                onClick={() => {
                    handleSubmit();
                }}
            >
                Submit
            </button>
        </div>
    );
}
