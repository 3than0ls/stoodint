import Subjects from '~/client/components/SubjectHome/Subjects'
import firebase from '~/client/firebase/Firebase'

export default function SubjectsHome({ subjects }) {
  return (
    <>
      <Subjects subjects={subjects} />
    </>
  )
}

export async function getServerSideProps(ctx) {
  let subjects = await firebase.getSubjects()

  // should actually be a firebase admin idToken verification
  if (!ctx.req.cookies.idToken) {
    subjects = subjects.filter((subject) => !subject.private)
  }

  return {
    props: { subjects },
  }
}
