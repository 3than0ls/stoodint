import '~/styles/tailwind.css'
import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import firebase from '~/client/firebase/Firebase'
import AuthContext from '~/client/context/auth-context'
import Navbar from '~/client/components/Navbar/Navbar'
import MobileMenu from '~/client/components/Navbar/Mobile/MobileMenu'
import Cookies from 'js-cookie'
import LearnQuestionContext from '~/client/context/learn-question-context'

// might move head to its own component in /components

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  const [loggedIn, setLoggedIn] = useState(undefined)
  firebase.auth.onAuthStateChanged((user) => {
    const value = !!user
    setLoggedIn(value)
    if (value) {
      Cookies.set('loggedIn', value)
    } else {
      Cookies.remove('loggedIn')
    }
  })

  const [learnQuestions, setLearnQuestions] = useState([])

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loggedInOptions] = useState([
    {
      label: 'Sign Out',
      href: null,
      onClick: useCallback(async () => {
        await firebase.signOut()
        router.reload() // is this neccesary?
      }),
    },
  ])
  const [navLinks] = useState([
    {
      name: 'Subjects',
      href: '/subjects',
    },
    {
      name: 'Contact',
      href: '/contact',
    },
    {
      name: 'About',
      href: '/about',
    },
  ])

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
      }}
    >
      <Head>
        <title>Stoodint</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <div className="bg-app-gray min-h-screen relative overflow-x-hidden">
        <Navbar
          setMobileMenuOpen={setMobileMenuOpen}
          loggedInOptions={loggedInOptions}
          navLinks={navLinks}
        />

        <MobileMenu
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          loggedInOptions={loggedInOptions}
          navLinks={navLinks}
        />

        <LearnQuestionContext.Provider
          value={{ learnQuestions, setLearnQuestions }}
        >
          <Component {...pageProps} />
        </LearnQuestionContext.Provider>
      </div>
    </AuthContext.Provider>
  )
}
