import { useEffect, useState } from 'react'
import Loading from '~/client/components/common/Loading'
import NotFound from '~/client/components/common/NotFound'
import CreateQuestionSet from '~/client/components/QuestionSetForm/CreateQuestionSet'
import firebase from '~/client/firebase/Firebase'

export default function CreateQuestionSetHome({ subjectID }) {
  const [subject, setSubject] = useState(undefined)
  useEffect(() => {
    async function getSubject() {
      try {
        let fetchedSubject = await firebase.getSubject(subjectID)
        console.log(fetchedSubject)
        setSubject(fetchedSubject)
      } catch (err) {
        console.log(err)
        setSubject(null)
      }
    }
    getSubject()
  }, [])

  switch (subject) {
    case null:
      return <NotFound />
    case undefined:
      return <Loading />
    default:
      return <CreateQuestionSet subject={subject} />
  }
}

export async function getServerSideProps(ctx) {
  // a scuffed way to get subject data that may have already been fetched, but i was too lazy and it didnt seem too appropriate to useContext
  if (!ctx.req.cookies.loggedIn) {
    return {
      redirect: {
        destination: '/subjects',
        permanent: false,
      },
    }
  }
  const { subjectID } = ctx.params
  return { props: { subjectID } }
}
