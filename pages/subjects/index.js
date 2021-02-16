import Subjects from '~/client/components/SubjectHome/Subjects'
import firebase from '~/client/firebase/Firebase'

export default function SubjectsHome({ subjects }) {
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
