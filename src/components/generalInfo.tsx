import { surveysContract } from "../contracts";
import { useReadContract, useWriteContract } from "wagmi";
import { useState } from "react";

export function SurveyContent({index}:{index :number}) {
    const { data: survey } = useReadContract({...surveysContract, functionName: "surveys", args: [BigInt(index)]});
    console.log(survey);

    return (
        <div>
            {survey === undefined ? <div>Loading...</div> : 
            <div>
                Description : {survey[7]} <br/>
                Survey ID : {Number(survey[0])} <br/>
                Creator : {survey[1]} <br/>
                Reward : {Number(survey[2])} <br/>
                Questions : {
                    survey[4]
                    } <br/>
                Number of Responses : {Number(survey[5])} <br/>
                Open : {survey[6] ? "Yes" : "No"} <br/>
            </div>
            }

        </div>

    );

 }
 
 export default SurveyContent;
