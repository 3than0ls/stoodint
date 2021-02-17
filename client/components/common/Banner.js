import React, { useState } from 'react'

export default function Banner({ src, name, bottomText, alt, description }) {
  const [hovering, setHovering] = useState(false)
  return (
    <div className="w-full flex flex-col">
      <div
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className="relative w-full overflow-hidden rounded-2xl text-white"
      >
        <img
          className="max-h-64 md:max-h-72 lg:max-h-80 w-full object-cover rounded-2xl shadow-xl blurred"
          src={src}
          alt={alt || 'banner'}
        />
        <div className="absolute inset-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50 rounded-2xl">
          <p
            className={`text-4xl h-full flex flex-col justify-center  ${
              hovering ? 'scale-125' : ' translate-y-2'
            } transition transform duration-1000`}
          >
            {name}
          </p>
        </div>
        <div
          className={`absolute inset-x-0 bottom-0 w-full text-center ${
            hovering ? 'translate-y-0' : 'translate-y-16'
          } transition transform duration-1000`}
        >
          {bottomText && <p className="mb-4 opacity-75">{bottomText}</p>}
        </div>
      </div>
      <p className="w-full mt-2 md:mt-5 text-white text-xl md:text-2xl xl:text-3xl text-center break-words">
        {description}
      </p>
    </div>
  )
}
