import Navbar from '~/client/components/Navbar/Navbar'
import '~/styles/tailwind.css'
import AuthContext from '~/client/context/auth-context'
import React, { useState } from 'react'
import firebase from '~/client/firebase/Firebase'
import Head from 'next/head'
// might move head to its own component in /components

function MyApp({ Component, pageProps }) {
  // logged can be either undefined (firebase still initing, will be set on authstate and inited), false, or true
  const [loggedIn, setLoggedIn] = useState(undefined)
  firebase.auth().onAuthStateChanged((user) => setLoggedIn(!!user))
  return (
    <AuthContext.Provider
      value={{
        loggedIn,
      }}
    >
      <Head>
        <title>Stoodint</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charset="UTF-8" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <div className="bg-app-gray min-h-screen">
        <Navbar />
        <Component {...pageProps} />
      </div>
    </AuthContext.Provider>
  )
}

export default MyApp
