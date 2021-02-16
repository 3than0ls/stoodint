import CreateSet from '~/client/components/SubjectForm/CreateSubject'
import { useContext } from 'react'
import authContext from '~/client/context/auth-context'
import Link from 'next/link'

export default function Create() {
  const { loggedIn } = useContext(authContext)
  return (
    <>
      <CreateSet />
    </>
  )
}

export function getServerSideProps(ctx) {
  if (!ctx.req.cookies.idToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return { props: {} }
}
