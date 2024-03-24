import React, { useRef, useState } from 'react';
import SurveyContent from './SurveyContent';
import Answer from './Answer';
import { useReadContract } from 'wagmi';
import { surveysContract } from '@/contracts';

export const SurveyDisplay: React.FC = () => {
    const { data: surveyCount } = useReadContract({
        ...surveysContract,
        functionName: 'surveyCount',
    });
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [visibleRange, setVisibleRange] = useState<[number, number]>([0, 4]);
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
        if (direction === 'left' && visibleRange[0] > 0) {
            setVisibleRange([visibleRange[0] - 1, visibleRange[1] - 1]);
        } else if (
            direction === 'right' &&
            visibleRange[1] < Number(surveyCount)
        ) {
            setVisibleRange([visibleRange[0] + 1, visibleRange[1] + 1]);
        }
    };

    return (
        <div className="flex flex-row items-center justify-center">
            <button
                onClick={() => scroll('left')}
                className="z-10 mr-2 rounded-full bg-purple-300 p-2 shadow-lg"
                aria-label="Scroll left"
            >
                &#8678;
            </button>
            <div className="flex overflow-x-auto" ref={carouselRef}>
                <div className="m-12 flex snap-x gap-6">
                    {Array.from(
                        { length: Number(surveyCount) },
                        (_, index) => index,
                    )
                        .slice(visibleRange[0], visibleRange[1])
                        .map((index) => (
                            <div
                                className="shrink-0 snap-start first:ml-auto last:mr-auto"
                                key={index}
                            >
                                <div className="min-h-[400px] min-w-[300px] rounded-3xl bg-purple-400 p-4 shadow-[20px_20px_20px_0_rgba(0,0,0,1)] hover:bg-purple-300">
                                    <SurveyContent index={index} />
                                    <br></br>
                                    <a
                                        className="focus:shadow-outline mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                                        href={`/replysurvey?surveyid=${index}`}
                                    >
                                        Answer
                                    </a>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <button
                onClick={() => scroll('right')}
                className="z-10 ml-2 rounded-full bg-purple-300 p-2 shadow-lg"
                aria-label="Scroll right"
            >
                &#8680;
            </button>
            {showAnswer ? <Answer index={currentIndex} /> : null}
        </div>
    );
};

export default SurveyDisplay;
