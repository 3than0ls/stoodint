import React, { useEffect } from 'react'

export default function Navbar() {
  const [minimized, setMinimized] = React.useState(false)
  useEffect(() => {
    window.onscroll = () => {
      setMinimized(window.scrollY > 200)
    }
  }, [])
  return (
    <div className="relative w-full h-24">
      <div
        onClick={() => setMinimized(!minimized)}
        className={`fixed top-0 z-30 w-full font-semibold text-3xl
              bg-app-dark-blue shadow-xl text-white border-b-4 border-app-blue-1 p-4 flex items-center justify-center 
              transition-height duration-300 ease-in-out ${
                minimized ? 'h-16' : 'h-24'
              }
         `}
      >
        Navbar
      </div>
    </div>
  )
}
