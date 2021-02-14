import React, { useEffect, useContext } from 'react'
import LoginButton from './LoginButton'
import AuthContext from '../../context/auth-context'
import LoggedIn from './LoggedIn'

export default function Navbar() {
  const { loggedIn } = useContext(AuthContext)
  return (
    <div className="pt-4 py-2 px-8 sm:px-12 md:px-24 lg:px-32 xl:px-36 relative w-full h-28 flex items-center justify-between">
      <a className="h-3/5 sm:h-5/6 cursor-pointer " href="/">
        <img
          className="select-none h-full"
          src="/stoodint.png"
          alt="stoodint"
        />
      </a>
      {loggedIn ? <LoggedIn /> : <LoginButton />}
    </div>
  )
  // return (
  //   <div className="relative w-full h-24">
  //     <div
  //       className={`fixed top-0 z-50 w-full font-semibold text-3xl
  //             bg-app-dark-blue shadow-xl text-white border-b-4 border-app-blue-1 flex items-center justify-center
  //             transition-height duration-300 ease-in-out ${
  //               minimized ? 'h-16' : 'h-24'
  //             }
  //        `}
  //     >
  //       <div className="w-4/5 flex justify-end text-xl xl:text-2xl">
  //         <LoginButton />
  //       </div>
  //     </div>
  //   </div>
  // )
}
