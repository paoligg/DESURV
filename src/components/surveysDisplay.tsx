import React, { useRef, useState } from 'react';
import SurveyContent from './surveyContent';
import Answer from './answer';
import { useReadContract } from "wagmi";
import { surveysContract } from "@/contracts";

export const SurveyDisplay: React.FC = () => {
    const { data: surveyCount } = useReadContract({ ...surveysContract, functionName: "surveyCount" });
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const carouselRef = useRef<HTMLDivElement>(null);

    if (!surveyCount) {
        return <div>Loading...</div>;
    }

    const handleSurveyClick = (index: number) => {
        setCurrentIndex(index);
        setShowAnswer(true);
    };
  

    const closeModal = () => {
        setShowAnswer(false);
    };

    const scroll = (direction: 'left' | 'right') => {
        if (carouselRef.current) {
            const { current } = carouselRef;
            if (direction === 'left') {
                current.scrollBy({ left: -300, behavior: 'smooth' });
            } else if (direction === 'right') {
                current.scrollBy({ left: 300, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="flex flex-row justify-center items-center">
            <button
                onClick={() => scroll('left')}
                className="z-10 mr-2 bg-gray-100 p-2 rounded-full shadow-lg"
                aria-label="Scroll left"
            >
                &#8678;
            </button>
            <div className="flex overflow-x-auto" ref={carouselRef}>
                <div className="flex snap-x gap-4">
                    {Array.from({ length: Number(surveyCount) }, (_, index) => (
                        <div className="snap-start shrink-0 first:ml-auto last:mr-auto" key={index}>
                            <div className="min-w-[300px] bg-white rounded-lg shadow-md p-4 text-black">
                                <SurveyContent index={index} />
                                <button 
                                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                                    onClick={() => handleSurveyClick(index)}>
                                    Answer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button
                onClick={() => scroll('right')}
                className="z-10 ml-2 bg-gray-100 p-2 rounded-full shadow-lg"
                aria-label="Scroll right"
            >
                &#8680;
            </button>
            {showAnswer ? (
                <Answer index={currentIndex} />
            ) : null}
        </div>
    );
};

export default SurveyDisplay;
