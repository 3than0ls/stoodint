import React from 'react'

// probably shuold move elsewhere

export default React.createContext({
  loggedIn: false,
  login: () => {},
  logout: () => {},
})
