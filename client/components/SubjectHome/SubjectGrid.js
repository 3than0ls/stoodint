import React from 'react'
import Card from '../common/Card'

export default function SubjectGrid({ subjects }) {
  const generateCards = () => {
    const cards = []
    for (const subject of subjects) {
      cards.push(
        <Card
          key={subject.id}
          href={`/subjects/${subject.id}`}
          cardObject={subject}
        />
      )
    }
    return cards
  }
  return (
    <div
      className={` transition transform duration-500 w-full flex flex-col pb-16 bg-app-gray`}
    >
      <div className="w-full flex flex-row justify-center flex-wrap mt-2">
        {generateCards()}
      </div>
    </div>
  )
}
