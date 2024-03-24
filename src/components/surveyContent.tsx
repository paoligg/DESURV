import { surveysContract } from "../contracts";
import { useReadContract, useWriteContract } from "wagmi";
import Answer from "./answer";

export function SurveyContent({index}:{index :number}) {
    const { data: survey } = useReadContract({...surveysContract, functionName: "surveys", args: [BigInt(index)]});
    return (
        <div>
            {survey === undefined ? <div>Loading...</div> : 
            <div>
                <Answer index={Number(survey[0])} />
                Number of Responses : {Number(survey[5])}/{Number(survey[3])} <br/>
                {survey[6] ? <span className="font-bold text-green-400">Open</span>  : <span className="font-bold text-red-400">Closed</span>} <br/>
            </div>
            }

        </div>

    );

 }
 
 export default SurveyContent;
