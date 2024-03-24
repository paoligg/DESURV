import { useSearchParams } from 'next/navigation';
import ReplySurveyComponent from '@/components/ReplySurveyComponent';

export default function replySurvey() {
    //get from url search params the survey id
    let urlParams = useSearchParams();
    const surveyID = parseInt(urlParams.get('surveyid') ?? '-1');
    return (
        <div>
            {surveyID >= 0 ? (
                <ReplySurveyComponent surveyID={surveyID} />
            ) : (
                <div>Invalid survey ID</div>
            )}
        </div>
    );
}
