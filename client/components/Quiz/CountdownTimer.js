import React, { useEffect } from 'react'
import Container from '../common/Container'

export default function CountdownTimer({
  countdownStart,
  countdownNumber,
  countdown,
}) {
  useEffect(() => {
    const id = window.setInterval(countdown, 1000)
    return () => {
      window.clearInterval(id)
    }
  }, [])

  const determineTransition = (number) => {
    if (countdownStart === countdownNumber && number === countdownStart) {
      return ''
    }
    if (number > countdownNumber) {
      return '-translate-x-32 opacity-0'
    }
    if (number < countdownNumber) {
      return 'translate-x-32 opacity-0'
    }
  }

  const generate = () => {
    const numbers = [
      <div
        className={`${determineTransition(
          4
        )} absolute transition transform duration-500 text-9xl`}
        key={'start'}
      >
        Get Ready
      </div>,
    ]

    for (let i = 1; i < countdownStart; i++) {
      if (i > countdownNumber - 2 && i < countdownNumber + 2) {
        numbers.push(
          <div
            className={`${determineTransition(
              i
            )} absolute transition transform duration-500 text-9xl`}
            key={i}
          >
            {i === 0 ? 'Start' : i}
          </div>
        )
      }
    }
    return numbers
  }

  return (
    <Container
      variant
      className={`justify-center pb-4 md:pb-16 ${
        countdownNumber === 0 ? `opacity-0` : 'opacity-100'
      } transition duration-500`}
    >
      <div className="relative h-36 sm:h-40 md:h-48 lg:h-52 xl:h-64 text-5xl text-white bg-app-blue-3  w-full flex items-center justify-center">
        {generate()}
      </div>
    </Container>
  )
}
