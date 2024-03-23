import { surveysContract } from "../contracts";
import { useReadContract, useWriteContract } from "wagmi";
import { useState } from "react";
import Answer from "./answer";

export function SurveyContent({index}:{index :number}) {
    const { data: survey } = useReadContract({...surveysContract, functionName: "surveys", args: [BigInt(index)]});
    return (
        <div>
            {survey === undefined ? <div>Loading...</div> : 
            <div>
                <Answer index={Number(survey[0])} />
                Number of Responses : {Number(survey[5])} <br/>
                Open : {survey[6] ? "Yes" : "No"} <br/>
            </div>
            }

        </div>

    );

 }
 
 export default SurveyContent;
