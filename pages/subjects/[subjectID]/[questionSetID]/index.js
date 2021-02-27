import { useEffect, useState } from 'react'
import Loading from '~/client/components/common/Loading'
import NotFound from '~/client/components/common/NotFound'
import Questions from '~/client/components/Questions/QuestionSet'
import firebase from '~/client/firebase/Firebase'

export default function QuestionSetHome({ questionSetID, subjectID }) {
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
    firebase.auth.onAuthStateChanged(getQuestionSet)
  }, [])

  switch (questionSet) {
    case null:
      return <NotFound />
    case undefined:
      return <Loading />
    default:
      return <Questions questionSet={questionSet} subjectID={subjectID} />
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
