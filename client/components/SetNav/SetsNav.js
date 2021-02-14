import React, { useContext, useState } from 'react'
import NoSets from './NoSets'
import SetCarouselCard from './SetCarousel/SetCarouselCard'
import SetCarousel from './SetCarousel/SetCarousel'
import SpecialSetCarouselCard from './SetCarousel/SpecialSetCarouselCard'
import CreateNewSet from './Views/CreateNewSet'
import PickView from './Views/PickView'
import AllSets from './Views/AllSets'
import AuthContext from '~/client/context/auth-context'

export default function SetsNav({ questionSets }) {
  const { loggedIn } = useContext(AuthContext)
  // const loggedIn = false
  const [view, setView] = useState(true ? 'pickView' : 'sets') // pickView (pick an option following), sets (list all sets), create new (make new set)

  const generateSetCarouselCards = () => {
    const setCards = []
    for (const questionSet of questionSets) {
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
        onClick={() => setView('sets')}
      />
    )
    setCards.push(
      <SpecialSetCarouselCard
        loggedIn={loggedIn}
        key={'create'}
        type="create"
        onClick={() => loggedIn && setView('createNewSet')}
      />
    )
    return setCards
  }

  return questionSets.length > 0 ? (
    <div className="w-full flex flex-col items-center justify-evenly mt-8">
      <SetCarousel generateSetCarouselCards={generateSetCarouselCards} />
      <div
        className={`relative w-full text-center mt-2 ${
          view === 'pickView' ? 'overflow-y-hidden' : 'overflow-y-visible'
        }`}
      >
        <AllSets
          view={view}
          questionSets={questionSets}
          setView={setView}
          loggedIn={loggedIn}
        />
        <CreateNewSet view={view} setView={setView} />
        <PickView view={view} setView={setView} loggedIn={loggedIn} />
      </div>
    </div>
  ) : (
    <NoSets />
  )
}
/*

{loggedIn ? (
  <>
    <AllSets
      view={view}
      questionSets={questionSets}
      setView={setView}
      loggedIn={loggedIn}
    />
    <CreateNewSet view={view} setView={setView} />
    <PickView view={view} setView={setView} loggedIn={loggedIn} />
  </>
) : (
  <AllSets
    view={view}
    questionSets={questionSets}
    loggedIn={loggedIn}
    setView={setView}
  />
)}*/
