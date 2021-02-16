import React, { useContext } from 'react'

export default function SpecialSetCarouselCard({ onClick, loggedIn, type }) {
  const text = {
    create: 'Or create your own question set!',
    subjects: 'Take a look at all of our current subjects!',
  }
  return (
    <button onClick={onClick} className="focus:outline-none w-full">
      <div className="h-64 sm:h-72 xl:h-96 relative cursor-pointer hover:scale-105 transform transition duration-300">
        <div className="text-4xl h-full absolute inset-0 pt-6 bg-opacity-50 bg-black flex flex-col justify-center items-center text-white hover:text-app-light-blue-1 ">
          <p className="text-2xl sm:text-3xl md:text-4xl transition duration-300">
            {text[type]}
          </p>

          {!loggedIn && type === 'create' && (
            <a
              href="/login"
              className="hover:underline mt-2 text-xl sm:text-2xl cursor-pointer transition duration-300"
            >
              Log in if you are a site admin
            </a>
          )}
        </div>
        <img
          src="/innovation.png"
          alt="example"
          className="w-full object-cover pt-4 blurred"
        />
      </div>
    </button>
  )
}
