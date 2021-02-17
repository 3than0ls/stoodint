import React from 'react'
import Card from '../common/Card'

export default function QuestionSetGrid({ subject, questionSets }) {
  const generateCards = () => {
    const cards = []
    for (const questionSet of questionSets) {
      cards.push(
        <Card
          key={questionSet.id}
          href={`/subjects/${subject.id}/${questionSet.id}`}
          cardObject={questionSet}
        />
      )
    }
    return cards
  }
  return (
    <div className="w-full flex flex-row justify-evenly flex-wrap mt-2">
      {generateCards()}
    </div>
  )
}
