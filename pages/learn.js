import { useContext, useEffect, useState } from 'react'
import Loading from '~/client/components/common/Loading'
import Learn from '~/client/components/Learn/Learn/Learn'
import LearnForm from '~/client/components/Learn/LearnForm/LearnForm'
import learnQuestionContext from '~/client/context/learn-question-context'
import firebase from '~/client/firebase/Firebase'

export default function LearnHome() {
  // learn will just be a list of all questions in a question set from one or more question sets
  // it will have several states which will render different things
  // 'form' -> Render form that the user will pick what questions sets to learn from
  // undefined -> set before request is made to firebase and renders loading
  // null -> somehow user made a request to a question list that doesn't exist, render not found
  // [question, ...] (filled list) -> list is populated with questions, render the learning thing
  const { learnQuestions } = useContext(learnQuestionContext)
  const [learn, setLearn] = useState(
    Array.isArray(learnQuestions) && learnQuestions.length > 0
      ? learnQuestions
      : 'form'
  )
  //   console.log(learnQuestions)

  switch (learn) {
    case 'form':
      return <LearnForm setLearn={setLearn} />
    case null:
      return <NotFound />
    case undefined:
      return <Loading />
    default:
      return <Learn learn={learn} />
  }
}
