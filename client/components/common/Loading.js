import React from 'react'
import Container from './Container'
import { Icon } from './Icon'

export default function Loading() {
  const colors = ['#4a86e8', '#3d85c6', '#6fa8dc']
  return (
    <Container
      col
      className="justify-center items-center pt-8 sm:pt-16 md:pt-20 lg:pt-28 xl:pt-36 overflow-hidden"
    >
      <div className="flex flex-row justify-center items-center animate-bounce">
        {colors.map((color, index) => (
          <Icon
            className={`custom-animated mx-4 md:mx-3 lg:mx-16 ${
              index % 2 === 1 ? ' rotate-22.5 ' : ''
            }`}
            key={index}
            name="gear"
            color={color}
            width={256}
            height={256}
          />
        ))}
      </div>

      <p className="w-full mt-4 lg:mt-12 mb-16 text-app-green text-3xl lg:text-4xl xl:text-5xl text-center">
        Loading...
      </p>
    </Container>
  )
}
