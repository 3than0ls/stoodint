import React, { useContext } from 'react'
import Link from 'next/link'
import { Icon } from '../../common/Icon'
import LoginButton from './LoginButton'
import authContext from '~/client/context/auth-context'
import LoggedIn from "./LoggedIn"

export default function MobileMenu({
  mobileMenuOpen,
  setMobileMenuOpen,
  loggedInOptions,
  navLinks,
}) {
  const { loggedIn } = useContext(authContext)
  return (
    <>
      <div
        className={`block lg:hidden ${
          mobileMenuOpen ? 'opacity-75' : 'opacity-0 pointer-events-none'
        } bg-black transition transform duration-500 inset-0 right-0 w-full h-full z-40 absolute`}
      />
      <div
        className={`flex lg:hidden overflow-y-auto flex-col items-center text-white shadow-2xl ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } bg-app-dark-blue transition transform duration-500 inset-y-0 right-0 h-full w-96 z-50 absolute py-8 px-10`}
      >
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="cursor-pointer absolute top-0 right-0 mt-8 mr-10"
        >
          <Icon name="exit" />
        </div>
        <p className="text-3xl mb-8 font-semibold w-full text-left">Menu</p>
        {loggedIn !== undefined &&
          (loggedIn ? (
            <LoggedIn loggedInOptions={loggedInOptions} />
          ) : (
            <LoginButton onClick={() => setMobileMenuOpen(false)} />
          ))}
        {navLinks.map((link) => (
          <Link href={link.href} key={link.name}>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="my-3 mx-6 p-4 w-full bg-app-blue-2 text-center rounded-2xl shadow-2xl tracking-wide text-2xl hover:opacity-75 transition duration-300"
            >
              {link.name}
            </a>
          </Link>
        ))}
      </div>
    </>
  )
}
