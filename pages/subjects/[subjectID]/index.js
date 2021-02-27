import { useState, useEffect } from 'react'
import Loading from '~/client/components/common/Loading'
import NotFound from '~/client/components/common/NotFound'
import Subject from '~/client/components/Subject/Subject'
import firebase from '~/client/firebase/Firebase'

export default function SubjectHome({ subjectID }) {
  const [subject, setSubject] = useState(undefined)

  useEffect(() => {
    // could be renamed as getQuestionSets, but i already named the component Subject rather than QuestionSets, kinda stupid of me
    // besides, the firebase function also fetches some subject data besides just the question sets
    async function getSubject() {
      try {
        let fetchedSubject = await firebase.getSubject(subjectID)
        setSubject(fetchedSubject)
      } catch (err) {
        console.log(err)
        setSubject(null)
      }
    }
    firebase.auth.onAuthStateChanged(getSubject)
  }, [])

  switch (subject) {
    case null:
      return <NotFound />
    case undefined:
      return <Loading />
    default:
      return <Subject subject={subject} />
  }
}

export async function getServerSideProps(context) {
  return {
    props: { subjectID: context.params.subjectID }, // will be passed to the page component as props
  }
}
