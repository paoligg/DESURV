import { surveysContract } from "@/contracts";
import { useReadContract, useWriteContract } from "wagmi";
import SurveyContent from "./surveyContent";

export const SurveyDisplay = () => {
    const { data : surveyCount} = useReadContract({...surveysContract, functionName: "surveyCount",});
    const surv= [];
    if (!surveyCount) {
        return <div>Loading...</div>;
    }
    else {
        console.log(surveyCount);
        
        for (let i = 0; i < surveyCount; i++) {
            surv.push(".");
        }
    }
    return (
        <div>
            <h1>Survey Display</h1>
            <div>
                {surv.map((_, index) => (
                    <SurveyContent key={index} index={index} />
                ))}
                </div>
        </div>
    );

 };
 
 export default SurveyDisplay;
