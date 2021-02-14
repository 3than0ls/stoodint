import Navbar from '~/client/components/Navbar/Navbar'
import '~/styles/tailwind.css'
import AuthContext from '~/client/context/auth-context'
import axios from '~/client/utils/axios'
import React, { useState } from 'react'

function MyApp({ Component, pageProps }) {
  const [loggedIn, setLoggedIn] = useState(!!axios.getIdToken())
  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        login: () => setLoggedIn(true),
        logout: () => setLoggedIn(false),
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
