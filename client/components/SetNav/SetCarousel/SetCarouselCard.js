import React, { useState } from 'react'
import Link from 'next/link'

export default function SetCarouselCard({ setData }) {
  const { name, description, questionSetID } = setData
  const [hovering, setHovering] = useState(false)
  return (
    <Link href={`/sets/${questionSetID}`}>
      <a>
        <div
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          className="sm:h-72 xl:h-96 relative cursor-pointer  hover:scale-105 transform transition duration-300"
        >
          <div className="absolute z-20 bg-black h-full w-full opacity-0 hover:bg-opacity-75 hover:opacity-100 transition duration-500">
            <div
              className={`${
                hovering
                  ? 'translate-y-0 bg-opacity-100'
                  : '-translate-y-32 bg-opacity-0 pointer-events-none'
              } transform transition duration-500 text-white flex flex-col justify-center h-full`}
            >
              <h3 className="text-4xl">{name}</h3>
              <p className="mt-4">{description}</p>
            </div>
          </div>
          <div className="text-4xl h-1/2 absolute inset-x-0 pt-6 bg-opacity-80 bg-gradient-to-b from-black to-transparent">
            <p
              className={`${
                !hovering
                  ? 'translate-y-0 opacity-100'
                  : '-translate-y-32 opacity-0'
              } transform transition duration-500 text-white`}
            >
              {name}
            </p>
          </div>
          <img
            src={setData.bannerImage || 'innovation.png'}
            alt="banner"
            className="w-full object-cover select-none pt-4"
          />
        </div>
      </a>
    </Link>
  )
}
