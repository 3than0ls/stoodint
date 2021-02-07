import React from 'react'
import SetForm from './SetForm/SetForm'

export default function MakeNewSet() {
  return (
    <>
      <p className="text-4xl lg:text-5xl xl:text-6xl mt-16 mb-6 text-app-green">
        Create a New Set
      </p>
      <SetForm />
    </>
  )
}
