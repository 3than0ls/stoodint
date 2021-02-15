import CreateSet from '~/client/components/SetForm/CreateSet'
import { withAuth } from '~/client/hoc/withAuth'
import { useContext } from 'react'
import authContext from '~/client/context/auth-context'
import Link from 'next/link'

function Create() {
  const { loggedIn } = useContext(authContext)
  console.log(loggedIn)
  return (
    <>
      {loggedIn === false ? (
        <div className="w-full text-center mt-24 text-2xl xl:text-3xl text-app-green mx-auto">
          <Link href="/login">
            <a className="hover:opacity-95 transition duration-300">
              Please{' '}
              <span className="hover:underline">log in as a Site Admin</span> to
              create a new set
            </a>
          </Link>
        </div>
      ) : (
        <CreateSet />
      )}
    </>
  )
}
export default Create
// export default withAuth(Create)
