import { surveysContract } from "@/contracts";
import { useReadContract } from "wagmi";
import React from 'react';

interface AnswerProps {
    index: number;
}

const parseSurveyData = (data: string): Record<string, string[]> => {
    const questionsDict: Record<string, string[]> = {};
    const items = data.split(';');

    items.forEach(item => {
        const [question, answers] = item.split('@');
        questionsDict[question] = answers.split('|');
    });

    return questionsDict;
};

const Answer = (props: AnswerProps) => {
    const { data: survey } = useReadContract({...surveysContract, functionName: "surveys", args: [BigInt(props.index)]});
    if (survey === undefined) {
        return <div>Loading...</div>;
    } else {
        const surveyData = survey[4];
        const surveyQuestions = parseSurveyData(surveyData);
        const questionsToShow = 3; // Max number of questions to display initially
        const totalQuestions = Object.entries(surveyQuestions).length;
        const remainingQuestions = totalQuestions > questionsToShow ? totalQuestions - questionsToShow : 0;

        return (
            <div>
                <div>Questions du sondage {props.index + 1}</div>
                <div>Entreprise : {survey[7]}</div>
                <div>Reward : {Number(survey[2])}xtz</div>
                {Object.entries(surveyQuestions).slice(0, questionsToShow).map(([question, answers], index) => (
                    <div key={index}>
                        <br></br>
                        <h2><u>Question {index + 1} :</u> <span className="hover:bg-purple-800">{question}</span></h2>
                    </div>
                ))}
               
                {remainingQuestions > 0 && (
                    <div className="hover:bg-blue-700">{remainingQuestions} more question{remainingQuestions > 1 ? 's' : ''}</div>
                )}
                <br></br>
            </div>
        );
    }
};

export default Answer;
