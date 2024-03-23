export default interface SurveyQuestions {
  question: string;
  questionRef: React.RefObject<HTMLInputElement>;
  possibleAnswers: string[];
}