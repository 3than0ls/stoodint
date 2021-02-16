import Navbar from '~/client/components/Navbar/Navbar'
import '~/styles/tailwind.css'
import AuthContext from '~/client/context/auth-context'
import React, { useState } from 'react'
import firebase from '~/client/firebase/Firebase'
import Cookies from 'js-cookie'
import Head from 'next/head'
// might move head to its own component in /components

function MyApp({ Component, pageProps }) {
  const [loggedIn, setLoggedIn] = useState(!!Cookies.get('idToken'))
  firebase.auth.onAuthStateChanged((user) => setLoggedIn(!!user))
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
      <div className="bg-app-gray min-h-screen">
        <Navbar />
        <Component {...pageProps} />
      </div>
    </AuthContext.Provider>
  )
}

export default MyApp
