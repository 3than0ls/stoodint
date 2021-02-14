import React, { useState, useCallback } from 'react'
import axios from '~/client/utils/axios'
import Seperator from '../common/Seperator'

export default function LoggedIn() {
  const [showMenu, setShowMenu] = useState(false)
  const username = 'Site Admin'
  const [options] = useState([
    {
      label: 'Sign Out',
      href: null,
      onClick: useCallback(async () => {
        await axios.signOut()
      }),
    },
  ])
  const generateOptions = () => {
    const generated = []
    for (const option of options) {
      console.log(option.href)
      if (option.href) {
        generated.push(
          <div className="hover:bg-opacity-75 bg-app-blue-2 mb-1 text-white rounded-xl w-11/12 mx-auto py-2 cursor-pointer transition duration-300">
            <a href={option.href}>{option.label}</a>
          </div>
        )
      } else {
        generated.push(
          <div
            onClick={option.onClick}
            className="hover:bg-opacity-75 bg-app-blue-2 mb-1 text-white rounded-xl w-11/12 mx-auto py-2 cursor-pointer transition duration-300"
          >
            {option.label}
          </div>
        )
      }
    }
    console.log(generated)
    return generated
  }
  return (
    <div className="relative w-20 h-20 rounded-2xl hover:bg-app-dark-blue bg-opacity-25 border transition duration-300">
      <img
        onClick={() => setShowMenu(!showMenu)}
        src="lightbulb.png"
        alt="lightbulb"
        className="w-full h-full p-1 cursor-pointer object-contain rounded-2xl"
      />
      <div
        className={`text-center mt-1 absolute right-0 p-4 w-64 bg-white text-black ${
          showMenu ? 'opacity-100' : 'opacity-0 select-none'
        } transition duration-300 shadow-2xl rounded-xl`}
      >
        Welcome <span className="font-bold">{username}</span>!
        <Seperator inversed={true} />
        {generateOptions()}
      </div>
    </div>
  )
}
