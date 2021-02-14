import Navbar from '~/client/components/Navbar/Navbar'
import '~/styles/tailwind.css'
import AuthContext from '~/client/context/auth-context'
import React, { useState } from 'react'
import firebase from '~/client/firebase/Firebase'

function MyApp({ Component, pageProps }) {
  const [loggedIn, setLoggedIn] = useState(undefined)
  firebase.auth().onAuthStateChanged((user) => setLoggedIn(!!user))
  return (
    <AuthContext.Provider
      value={{
        loggedIn,
      }}
    >
      <div className="bg-app-gray min-h-screen">
        <Navbar />
        <Component {...pageProps} />
      </div>
    </AuthContext.Provider>
  )
}

export default MyApp
