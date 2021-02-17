import NotFound from '~/client/components/common/NotFound'
import CreateQuestionSet from '~/client/components/QuestionSetForm/CreateQuestionSet'
import firebase from '~/client/firebase/Firebase'

export default function CreateQuestionSetHome({ subject }) {
  return (
    <>
      {subject === null ? (
        <NotFound />
      ) : (
        <CreateQuestionSet subject={subject} />
      )}
    </>
  )
}

export async function getServerSideProps(ctx) {
  // a scuffed way to get subject data that may have already been fetched, but i was too lazy and it didnt seem too appropriate to useContext
  if (!ctx.req.cookies.idToken) {
    return {
      redirect: {
        destination: '/subjects',
        permanent: false,
      },
    }
  }
  const subject = await firebase.getSubject(ctx.params.subjectID)
  return { props: { subject } }
}
