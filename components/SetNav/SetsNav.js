import React, { useEffect, useState } from 'react'
import NoSets from './NoSets'
import SetCarouselCard from './SetCarousel/SetCarouselCard'
import SetCarousel from './SetCarousel/SetCarousel'
import CreateSetCarouselCard from './SetCarousel/CreateSetCarouselCard'
import CreateNewSet from './Views/CreateNewSet'
import PickView from './Views/PickView'
import AllSets from './Views/AllSets'

export default function SetsNav({ questionSets }) {
  const [view, setView] = useState('pickView') // pickView (pick an option following), sets (list all sets), create new (make new set)

  const generateSetCarouselCards = () => {
    const setCards = []
    for (const questionSet of questionSets) {
      setCards.push(
        <SetCarouselCard key={questionSet.name} setData={questionSet} />
      )
    }
    setCards.push(
      <CreateSetCarouselCard
        key={'create'}
        onClick={() => setView('createNewSet')}
      />
    )
    return setCards
  }

  return questionSets.length > 0 ? (
    <div className="w-full flex flex-col items-center justify-evenly mt-8 lg:mt-16 xl:mt-20">
      <SetCarousel generateSetCarouselCards={generateSetCarouselCards} />
      <div
        className={`relative w-full text-center ${
          view === 'pickView' ? 'overflow-y-hidden' : 'overflow-y-visible'
        }`}
      >
        <CreateNewSet view={view} />
        <AllSets view={view} questionSets={questionSets} />
        <PickView view={view} setView={setView} />
      </div>
    </div>
  ) : (
    <NoSets />
  )
}
