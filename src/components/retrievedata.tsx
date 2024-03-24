import React, { useEffect, useState } from 'react';
import { surveysContract } from "../contracts";
import { useReadContract } from "wagmi";
import DecryptStringComponent from "./decrypt_message";

export function RetrieveData() {
    // Remove the prop {index} as you want the index to be input directly
    
    const [inputId, setInputId] = useState<number>(0); // Ensure inputId is typed as number
    const [survey, setSurvey] = useState<any>();

    // Update: Use useState to manage the surveyId to fetch
    const [fetchId, setFetchId] = useState<number | undefined>();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputId(Number(e.target.value)); // Convert the input value to a number
    };

    // Fetch survey data using the fetchId
    const { data: fetchsurvey } = useReadContract({...surveysContract, functionName: "returnAnswers", args: [BigInt(inputId) ]});

    // Update survey state when fetchedSurvey changes
    useEffect(() => {
        if (fetchsurvey) {
            setSurvey(fetchsurvey);
            console.log("fetchsruver " , fetchsurvey)
        }
    }, [fetchsurvey]);

    return (
        <div>
            <input
                className='text-black'
                id="surveyId"
                type="number"
                value={inputId.toString()} // Convert inputId back to string for the input value
                onChange={handleInputChange}
                placeholder="Enter Survey ID"
            />
           
            {!survey ? <div>Loading...</div> :
                <div>
                    {/* Use the fetched data */}
                    <DecryptStringComponent encryptedText={survey[inputId]?.answers || ''} />
                </div>
            }
        </div>
    );
}

export default RetrieveData;
