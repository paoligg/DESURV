import { RefObject } from "react";

export default interface SurveyQuestions {
  question: string;
  questionRef: RefObject<HTMLInputElement>;
  possibleAnswers: string[];
}