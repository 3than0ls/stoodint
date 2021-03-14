import React from 'react'
import Container from '../../common/Container'

export default function StartInfo({ learn, start }) {
  return (
    <Container col>
      <div className="mt-8 lg:border-2 border-white p-2 lg:p-4 w-full max-w-4xl text-center">
        <p className="text-2xl lg:text-3xl text-app-blue-3">
          There are <span className="font-bold">{learn.length}</span>{' '}
          question(s) in this quiz.
        </p>
        <p className="text-2xl mt-2 text-app-purple">
          Once you click an answer and press the continue button, you cannot
          return to it. Results will be shown upon completion of the entire
          quiz.
        </p>
      </div>
      <div
        onClick={start}
        className="mt-8 p-6 w-64 text-center text-xl rounded-2xl cursor-pointer shadow-xl hover:opacity-75 transition duration-300 items-center justify-center text-white bg-app-green"
      >
        Begin
      </div>
    </Container>
  )
}
