import React from 'react'

export default function Seperator({ inversed }) {
  return (
    <hr
      className={`${
        inversed ? 'my-3 w-11/12 border-black' : 'my-8 w-5/6 border-white'
      }  mx-auto`}
    />
  )
}
