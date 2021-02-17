import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Seperator from '../../common/Seperator'

export default function LoggedIn({ loggedInOptions }) {
  const [showMenu, setShowMenu] = useState(false)
  const router = useRouter()
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
    <div
      className="w-full mb-4 flex flex-col items-center rounded-2xl bg-opacity-25"
    >
      <img
        src="https://firebasestorage.googleapis.com/v0/b/stoodint-a9642.appspot.com/o/avatars%2Flightbulb.png?alt=media&token=f820a250-e39d-45f1-a5b5-d74c5fdafaf6"
        alt="avatar"
        className="hover:bg-app-dark-blue select-none w-36 h-36 p-1 object-contain rounded-2xl transition duration-300 border"
      />
      <div
        className="text-center mt-2 p-4 w-full bg-white text-black shadow-2xl rounded-xl"
      >
        Welcome 
        {' '}
        <span className="font-bold">{username}</span>
        !
        <Seperator inversed />
        {generateOptions()}
      </div>
    </div>
  )
}
