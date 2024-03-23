// import { surveysContract } from "@/contracts";
// import { useReadContract, useWriteContract } from "wagmi";
// //Create a component that display all the surveys in the contract
// export const Surveys = () => {
//     const { data: surveylist} = useReadContract({...surveysContract, functionName: "surveys",});
//     const { data : surveyCount} = useReadContract({...surveysContract, functionName: "surveyCount",});
//     console.log(surveylist);
//     {surveylist.map((survey, index) => {
//     return (
//         <d
//         <div className="survey" key={index}>
//             <a>{survey.creator}</a>
//             <a>{survey.reward}</a>
//             <a>{survey.maxResponses}</a>
//             <a>{survey.questions}</a>
//             <a>{survey.numResponses}</a>
//             <a>{survey.open}</a>
//             <a>{survey.description}</a>
//             <a>{survey.public_key}</a>
//             <a>{survey.nombre_question}</a>
//         </div>
//     );
//     })}
//  };
 
