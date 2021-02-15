import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import authContext from '../context/auth-context'

export const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter()
    const { loggedIn } = useContext(authContext)
    useEffect(() => {
      console.log('loggedIn', loggedIn)
      if (loggedIn !== undefined && loggedIn === false) {
        router.push('/')
      }
    }, [loggedIn])
    return <WrappedComponent {...props} />
  }
  return Wrapper
}
