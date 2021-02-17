import NotFound from '~/client/components/common/NotFound'
import Subject from '~/client/components/Subject/Subject'
import firebase from '~/client/firebase/Firebase'

export default function SubjectHome({ subject }) {
  return <>{subject === null ? <NotFound /> : <Subject subject={subject} />}</>
}

export async function getServerSideProps(ctx) {
  const subject = await firebase.getSubject(ctx.params.subjectID)
  return {
    props: { subject },
  }
}
