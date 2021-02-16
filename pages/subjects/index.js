import Subjects from '~/client/components/Subjects/Subjects'
import firebase from '~/client/firebase/Firebase'

export default function Subjectss({ subjects }) {
  return (
    <>
      <Subjects subjects={subjects} />
    </>
  )
}

export async function getStaticProps() {
  const subjects = await firebase.getSubjects()
  return {
    props: { subjects },
  }
}
