import { useEffect, useState } from 'react'
import Loading from '~/client/components/common/Loading'
import Subjects from '~/client/components/SubjectHome/Subjects'
import firebase from '~/client/firebase/Firebase'

export default function SubjectsHome() {
  const [subjects, setSubjects] = useState(undefined) // can set this to undefined as loading

  useEffect(() => {
    async function getSubjects() {
      try {
        let fetchedSubjects = await firebase.getSubjects()
        setSubjects(fetchedSubjects)
      } catch (err) {
        console.log(err)
        setSubjects([])
      }
    }
    getSubjects()
  }, [])

  return subjects === undefined ? <Loading /> : <Subjects subjects={subjects} />
}
