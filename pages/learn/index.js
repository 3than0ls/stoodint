import { useEffect, useState } from 'react'
import Loading from '~/client/components/common/Loading'
import Learn from '~/client/components/Learn/Learn/Learn'
import LearnForm from '~/client/components/Learn/LearnForm/LearnForm'
import { useRouter } from 'next/router'
import firebase from '~/client/firebase/Firebase'
import NotFound from '~/client/components/common/NotFound'

export default function LearnHome() {
  const router = useRouter()

  const [view, setView] = useState('loading')
  const [selectedSubject, setSelectedSubject] = useState(undefined)
  const [selectedQuestionSets, setSelectedQuestionSets] = useState([])

  useEffect(() => {
    if (Object.keys(router.query).length) {
      async function getData() {
        const { sID, qIDs } = router.query
        try {
          setSelectedSubject(await firebase.getSubject(sID))
        } catch (err) {
          console.log(err)
          setSelectedSubject(null)
        }

        if (qIDs) {
          const questionIDs = qIDs.split('~')
          setSelectedQuestionSets(
            questionIDs.map(
              async (questionID) => await firebase.getQuestionSet(questionID)
            )
          )
        }
      }
      firebase.auth.onAuthStateChanged(getData)
    }
  }, [])

  useEffect(() => {
    if (selectedSubject === undefined) {
      setView('form')
    } else if (selectedSubject === null) {
      router.push('/learn')
    } else {
      if (selectedQuestionSets.length === 0) {
        router.push('/learn')
      }
    }
  }, [selectedSubject, selectedQuestionSets])

  switch (view) {
    case 'form':
      return (
        <LearnForm
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          selectedQuestionSets={selectedQuestionSets}
          setSelectedQuestionSets={setSelectedQuestionSets}
          setView={setView}
        />
      )
    case 'not found':
      return <NotFound />
    case 'loading':
      return <Loading />
    default:
      /* quiz */
      return (
        <Learn
          subject={selectedSubject}
          questionSets={selectedQuestionSets}
          setView={setView}
        />
      )
  }
}
