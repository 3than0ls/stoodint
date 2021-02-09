import React from 'react'
import MakeNewSet from '../MakeNewSet'

export default function CreateNewSet({ view }) {
  return (
    <div
      className={`${
        view === 'createNewSet'
          ? 'opacity-100 translation-y-0'
          : 'opacity-0 -translate-y-64 pointer-events-none'
      } transition transform duration-500 w-full z-0 absolute bg-app-gray`}
    >
      <MakeNewSet />
    </div>
  )
}
