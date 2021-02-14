import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import Seperator from '../common/Seperator'
import OutsideClickHandler from 'react-outside-click-handler'
import firebase from '~/client/firebase/Firebase'

export default function LoggedIn() {
  const [showMenu, setShowMenu] = useState(false)
  const router = useRouter()
  const username = 'Site Admin'
  const [options] = useState([
    {
      label: 'Sign Out',
      href: null,
      onClick: useCallback(async () => {
        await firebase.signOut()
        router.reload()
      }),
    },
  ])
  const generateOptions = () => {
    const generated = []
    for (const option of options) {
      if (option.href) {
        generated.push(
          <div
            key={option.label}
            className="hover:bg-opacity-75 bg-app-blue-2 mb-1 text-white rounded-xl w-11/12 mx-auto py-2 cursor-pointer transition duration-300"
          >
            <a href={option.href}>{option.label}</a>
          </div>
        )
      } else {
        generated.push(
          <div
            key={option.label}
            onClick={option.onClick}
            className="hover:bg-opacity-75 bg-app-blue-2 mb-1 text-white rounded-xl w-11/12 mx-auto py-2 cursor-pointer transition duration-300"
          >
            {option.label}
          </div>
        )
      }
    }
    return generated
  }
  return (
    <div className={`relative w-20 h-20 rounded-2xl bg-opacity-25 border`}>
      <img
        onClick={() => setShowMenu(!showMenu)}
        src="lightbulb.png"
        alt="lightbulb"
        className={`hover:bg-app-dark-blue select-none w-full h-full p-1 cursor-pointer object-contain rounded-2xl  transition duration-300 ${
          showMenu ? 'bg-app-dark-blue' : ''
        } `}
      />
      <OutsideClickHandler
        onOutsideClick={() => showMenu && setShowMenu(false)}
      >
        <div
          className={`text-center mt-2 absolute z-50 right-0 p-4 w-64 bg-white text-black ${
            showMenu ? 'opacity-100' : 'opacity-0 select-none'
          } transition duration-300 shadow-2xl rounded-xl`}
        >
          Welcome <span className="font-bold">{username}</span>!
          <Seperator inversed={true} />
          {generateOptions()}
        </div>
      </OutsideClickHandler>
    </div>
  )
}
