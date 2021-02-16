import CreateSet from '~/client/components/SubjectForm/CreateSubject'
import { useContext } from 'react'
import authContext from '~/client/context/auth-context'
import Link from 'next/link'
import Cookies from 'js-cookie'

export default function Create() {
  const { loggedIn } = useContext(authContext)
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

// maybe replace with getServerSideProps and check cookies?
// export async function getStaticProps() {
//   if (!Cookies.get('idToken')) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     }
//   }
//   return { props: {} }
// }
