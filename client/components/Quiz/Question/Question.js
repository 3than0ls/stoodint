import React from 'react'
import Container from '../../common/Container'
import Answers from './Answers'

export default function Question({
  selectedAnswers,
  setSelectedAnswers,
  question,
}) {
  const questionLength = question.question.question.length
  let fontSize = 1
  if (questionLength < 100) {
    fontSize = 'text-3xl lg:text-4xl'
  } else if (questionLength < 250) {
    fontSize = 'text-3xl lg:text-4xl'
  } else if (questionLength < 450) {
    fontSize = 'text-2xl lg:text-3xl'
  } else {
    fontSize = 'text-2xl lg:text-3xl'
  }

  return (
    <Container col className="justify-start pt-8">
      <div className="w-full flex flex-col lg:flex-row lg:flex-between lg:items-center space-y-4 lg:space-y-0 space-x-0 lg:space-x-8">
        <p
          className={`${fontSize} text-white text-center lg:text-justify flex justify-center items-center w-full lg:w-1/2 break-all pr-2`}
        >
          {`${question.questionIndex}) ${question.question.question}`}
        </p>
        {!!question.question.image && (
          <a
            href={question.question.image.downloadURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={question.question.image.downloadURL}
              alt="image"
              className="object-contain max-h-96 mx-auto lg:mx-0"
            />
          </a>
        )}
      </div>
      <hr className="w-full my-6 border-white" />
      <Answers
        questionIndex={question.questionIndex}
        answers={question.question.answers}
        selectedAnswers={selectedAnswers}
        setSelectedAnswers={setSelectedAnswers}
      />
    </Container>
  )
}
