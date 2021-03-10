import { useEffect, useState } from 'react'
import Loading from '~/client/components/common/Loading'
import NotFound from '~/client/components/common/NotFound'
import Questions from '~/client/components/Questions/QuestionSet'
import firebase from '~/client/firebase/Firebase'

export default function QuestionSetHome({ questionSetID, subjectID }) {
  const [questionSet, setQuestionSet] = useState(undefined)
  const refreshQuestionSet = async () =>
    setQuestionSet(
      await firebase.getQuestionSet(subjectID, questionSetID, true)
    )

  useEffect(() => {
    async function getQuestionSet() {
      try {
        await refreshQuestionSet()
      } catch (err) {
        console.log(err)
        setQuestionSet(null)
      }
    }
    firebase.auth.onAuthStateChanged(getQuestionSet)
  }, [])

  switch (questionSet) {
    case null:
      return <NotFound />
    case undefined:
      return <Loading />
    default:
      return (
        <Questions
          refreshQuestionSet={refreshQuestionSet}
          questionSet={questionSet}
          subjectID={subjectID}
        />
      )
  }
}

export async function getServerSideProps(context) {
  return {
    props: {
      subjectID: context.params.subjectID,
      questionSetID: context.params.questionSetID,
    }, // will be passed to the page component as props
  }
}
