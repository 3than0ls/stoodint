import { useEffect, useState } from 'react'
import Loading from '~/client/components/common/Loading'
import NotFound from '~/client/components/common/NotFound'
import QuestionForm from '~/client/components/QuestionForm/QuestionForm'
import firebase from '~/client/firebase/Firebase'

export default function CreateQuestionHome({ subjectID, questionSetID }) {
  const [questionSet, setQuestionSet] = useState(undefined)

  useEffect(() => {
    async function getQuestionSet() {
      try {
        let fetchedQuestionSet = await firebase.getQuestionSet(
          subjectID,
          questionSetID
        )
        setQuestionSet(fetchedQuestionSet)
      } catch (err) {
        console.log(err)
        setQuestionSet(null)
      }
    }
    getQuestionSet()
  }, [])

  switch (questionSet) {
    case null:
      return <NotFound />
    case undefined:
      return <Loading />
    default:
      return (
        <QuestionForm subjectID={subjectID} questionSetID={questionSet.id} />
      )
  }
}

export async function getServerSideProps(ctx) {
  if (!ctx.req.cookies.loggedIn) {
    return {
      redirect: {
        destination: `/subjects/${subjectID}/${questionSetID}`,
        permanent: false,
      },
    }
  }
  const { subjectID, questionSetID } = ctx.params
  return { props: { subjectID, questionSetID } }
}
