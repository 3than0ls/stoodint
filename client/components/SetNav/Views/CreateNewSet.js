import React from 'react'
import BackButton from '../BackButton'
import MakeNewSet from '../MakeNewSet'

export default function CreateNewSet({ view, setView }) {
  return (
    <div
      className={`${
        view === 'createNewSet'
          ? 'opacity-100 translation-y-0'
          : 'opacity-0 -translate-y-64 pointer-events-none'
      } transition transform duration-500 w-full z-0 absolute flex flex-col bg-app-gray`}
    >
      <BackButton setView={setView} />
      <MakeNewSet />
    </div>
  )
}
