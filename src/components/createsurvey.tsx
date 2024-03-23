import React, { InputHTMLAttributes, Ref, useEffect, useState } from 'react'
import SurveyQuestions from '@/types/surveyquestions'
import { useAccount, useWriteContract } from 'wagmi'
import Question from './question'

export default function CreateSurvey() {
  const [questions, setQuestions] = useState<SurveyQuestions[]>([])
  const handleQuestionChange = (index: number, question: string) => {
    const newQuestions = [...questions]
    newQuestions[index].question = question
    setQuestions(newQuestions)
  }
  useEffect(() => {
    questions[questions.length - 1]?.questionRef.current?.focus()
  }, [questions.length])
  const handleAddQuestion = () => {
    const newQuestions = [...questions]
    const newQuestion = {
      question: '',
      questionRef: React.createRef<HTMLInputElement>(),
      possibleAnswers: [],
    }
    newQuestions.push(newQuestion)
    setQuestions(newQuestions)
  }

  return (
    <>
      <h1>Create a survey</h1>
      <div className="flex flex-row flex-wrap ">
        {questions.map((question, index) => (
          <div key={index} className="flex flex-col p-4">
            <input
              className="bg-slate-950 text-center"
              ref={question.questionRef}
              value={question.question}
              onChange={(event) =>
                handleQuestionChange(index, event.target.value)
              }
            />
            <Question
              questions={questions}
              setQuestions={setQuestions}
              index={index}
            />
          </div>
        ))}
        <button onClick={() => handleAddQuestion()}>Add question</button>
      </div>
    </>
  )
}
