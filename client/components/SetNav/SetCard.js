import React, { useState } from 'react'

export default function SetCard({ setData }) {
  const link = `/${setData.questionSetID}`
  const [hovering, setHovering] = useState(false)
  return (
    <div
      draggable="false"
      className="relative text-white h-64 md:h-72 lg:h-96 w-3/4 md:w-1/2 max-w-2xl mt-12 mx-12 rounded-2xl shadow-xl hover:scale-105 transform transition duration-300 ease-in-out"
    >
      <div
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className="absolute z-20 bg-black rounded-t-xl w-full h-4/5 opacity-0 hover:bg-opacity-75 hover:opacity-100 transition duration-500"
      >
        <div
          className={`${
            hovering
              ? 'translate-y-0 bg-opacity-100'
              : '-translate-y-16 bg-opacity-0 pointer-events-none'
          } transform transition duration-500 text-white h-full w-full flex flex-col items-center justify-center`}
        >
          <p className="mt-4 text-xl">Description: {setData.description}</p>
        </div>
      </div>
      <img
        src={setData.bannerImage}
        alt="banner"
        className="pt-4 pb-2 w-full h-4/5 object-contain bg-app-blue-1 rounded-t-xl shadow-inner"
      />
      <a
        href={link}
        className="text-xl lg:text-2xl px-4 lg:px-6 h-1/5 flex items-center justify-start break-words hover:underline bg-black rounded-b-2xl hover:bg-opacity-75 transition duration-500"
        draggable="false"
      >
        {setData.name}
      </a>
    </div>
  )
}
