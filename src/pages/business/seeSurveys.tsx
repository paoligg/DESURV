import React, { useEffect, useState } from 'react';
import { config } from '@/config';
import { surveysContract } from '@/contracts';
import { readContract } from '@wagmi/core';
import AnswerCard from '@/components/decrypt_message';

export function RetrieveData() {
    // Remove the prop {index} as you want the index to be input directly

    const [survey, setSurvey] = useState<any>();

    // Update: Use useState to manage the surveyId to fetch
    const handleSurveyIdChange = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const surveyID = parseInt(e.target.value) || -1;
        if (surveyID < 0) {
            setSurvey(undefined);
            return;
        }
        const fetchsurvey = await readContract(config, {
            ...surveysContract,
            functionName: 'returnAnswers',
            args: [BigInt(surveyID)],
        }).catch((e) => ({}));

        if (fetchsurvey) setSurvey(fetchsurvey);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold text-white">Retrieve Data</h1>
            <div className="flex w-1/4 flex-col text-white">
                <label className="-mb-1 ml-2">Survey ID</label>
                <input
                    className="rounded-2xl border border-purple-800 px-4 py-2 text-black"
                    type="number"
                    onChange={handleSurveyIdChange}
                    placeholder="Enter Survey ID"
                />
            </div>

            {survey === undefined ? (
                <p>Enter a survey ID</p>
            ) : Object.keys(survey).length === 0 ? (
                <p>Couldn't load this survey, incorrect ID ?</p>
            ) : (
                <div>
                    {survey.map((answers: any, index: number) => (
                        <AnswerCard
                            key={index}
                            encryptedText={answers.answers || ''}
                            index={index + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default RetrieveData;
