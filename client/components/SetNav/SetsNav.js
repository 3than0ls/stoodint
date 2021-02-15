import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import NoSets from './NoSets'
import SetCarouselCard from './SetCarousel/SetCarouselCard'
import SetCarousel from './SetCarousel/SetCarousel'
import SpecialSetCarouselCard from './SetCarousel/SpecialSetCarouselCard'
import SetsGrid from './SetsGrid'
import AuthContext from '~/client/context/auth-context'

export default function SetsNav({ questionSets }) {
  const { loggedIn } = useContext(AuthContext)
  const router = useRouter()

  const generateSetCarouselCards = () => {
    const setCards = []
    for (const questionSet of questionSets.slice(0, 3)) {
      setCards.push(
        <SetCarouselCard
          key={questionSet.questionSetID}
          setData={questionSet}
        />
      )
    }
    setCards.push(
      <SpecialSetCarouselCard
        loggedIn={loggedIn}
        key={'sets'}
        type="sets"
        onClick={() =>
          document.getElementById('sets').scrollIntoView({ behavior: 'smooth' })
        }
      />
    )
    setCards.push(
      <SpecialSetCarouselCard
        loggedIn={loggedIn}
        key={'create'}
        type="create"
        onClick={() => loggedIn && router.push('/sets/create')}
      />
    )
    return setCards
  }

  return questionSets.length > 0 ? (
    <div className="w-full flex flex-col items-center justify-evenly mt-8">
      <SetCarousel generateSetCarouselCards={generateSetCarouselCards} />
      <div id="sets" className="w-full text-center mt-4">
        <SetsGrid questionSets={questionSets} />
      </div>
    </div>
  ) : (
    <NoSets />
  )
}

/*
        <CreateNewSet view={view} setView={setView} />
        <PickView view={view} setView={setView} loggedIn={loggedIn} />*/
