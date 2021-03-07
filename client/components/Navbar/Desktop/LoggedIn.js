import React, { useState } from 'react'
import Link from 'next/link'
import OutsideClickHandler from 'react-outside-click-handler'
import Seperator from '../../common/Seperator'

export default function LoggedIn({ loggedInOptions }) {
  const [showMenu, setShowMenu] = useState(false)
  const username = 'Site Admin'
  const generateOptions = () => {
    const generated = []
    for (const option of loggedInOptions) {
      if (option.href) {
        generated.push(
          <div
            key={option.label}
            className="hover:bg-opacity-75 bg-app-blue-2 mb-1 text-white rounded-xl w-11/12 mx-auto py-2 cursor-pointer transition duration-300"
          >
            <Link href={option.href}>
              <a>{option.label}</a>
            </Link>
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
    <div className="ml-4 flex-shrink-0 relative w-20 h-20 rounded-2xl bg-opacity-25 border">
      <img
        onClick={() => setShowMenu(!showMenu)}
        src="https://firebasestorage.googleapis.com/v0/b/stoodint-a9642.appspot.com/o/avatars%2Flightbulb.png?alt=media&token=f820a250-e39d-45f1-a5b5-d74c5fdafaf6"
        alt="avatar"
        className={`hover:bg-app-dark-blue select-none w-full h-full p-1 cursor-pointer object-contain rounded-2xl  transition duration-300 ${
          showMenu ? 'bg-app-dark-blue' : ''
        } `}
      />
      <OutsideClickHandler
        onOutsideClick={() => showMenu && setShowMenu(false)}
      >
        <div
          className={`text-center mt-2 absolute z-50 right-0 p-4 w-64 bg-white text-black ${
            showMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'
          } transition duration-300 shadow-2xl rounded-xl`}
        >
          Welcome <span className="font-bold">{username}</span>
          !
          <Seperator inversed />
          {generateOptions()}
        </div>
      </OutsideClickHandler>
    </div>
  )
}
