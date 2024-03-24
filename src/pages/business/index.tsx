export default function Business() {
    const anchorStyle = 'text-4xl hover:text-purple-700 hover:font-bold';
    return (
        <div className="flex h-full flex-col items-center justify-center gap-32 p-4">
            <h1 className=" text-6xl font-bold">Business</h1>
            <div className="flex w-full items-center justify-center gap-10">
                <a href="business/createSurvey" className={anchorStyle}>
                    Create Survey
                </a>
                <a href="business/seeSurveys" className={anchorStyle}>
                    See survey replies
                </a>
            </div>
        </div>
    );
}
