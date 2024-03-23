import React, { useState } from 'react';
import SurveyContent from './surveyContent';
import Answer from './answer'; 
import { useReadContract } from "wagmi";
import { surveysContract } from "@/contracts";

export const SurveyDisplay = () => {
    const { data: surveyCount } = useReadContract({ ...surveysContract, functionName: "surveyCount" });
    const [showAnswer, setShowAnswer] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!surveyCount) {
        return <div>Loading...</div>;
    }

    const handleSurveyClick = (index:number) => {
        setCurrentIndex(index);
        setShowAnswer(true);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => {
        setShowAnswer(false);
    };

    return (
        <div>
            <h1>Survey Display</h1>
            {showAnswer ? (
                <Answer index={currentIndex} onClose={closeModal} />
            ) : (
                <div>
                    {Array.from({ length: Number(surveyCount) }, (_, index) => (
                        <div>
                        <SurveyContent key={index} index={index} />
                        <button onClick={() => handleSurveyClick(index)}>Answer</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SurveyDisplay;