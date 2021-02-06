import React, { useState } from 'react'

export default function CreateSetCard({ onClick }) {
  return (
    <button onClick={onClick} className="focus:outline-none w-full">
      <div className="sm:h-72 xl:h-96 relative cursor-pointer">
        <div className="text-4xl h-full absolute inset-0 pt-6 bg-opacity-50 bg-black flex justify-center items-center">
          <p className="text-white">Or create your own question set!</p>
        </div>
        <img
          src="/innovation.png"
          alt="example"
          className="w-full object-fill pt-4"
        />
      </div>
    </button>
  )
}
