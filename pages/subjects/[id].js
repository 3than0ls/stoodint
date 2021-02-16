import NotFound from '~/client/components/common/NotFound'
import firebase from '~/client/firebase/Firebase'

export default function SubjectHome({ subject }) {
  return <>{subject === null ? <NotFound /> : <div></div>}</>
}

export async function getServerSideProps(ctx) {
  const subject = await firebase.getSubject(ctx.params.id)
  console.log(subject)
  return {
    props: { subject },
  }
}
