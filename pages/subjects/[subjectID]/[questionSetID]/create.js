import NotFound from '~/client/components/common/NotFound'
import QuestionForm from '~/client/components/QuestionForm/QuestionForm'
import firebase from '~/client/firebase/Firebase'

export default function CreateQuestionHome({ subjectID, questionSet }) {
  return (
    <>
      {questionSet === null ? (
        <NotFound />
      ) : (
        <QuestionForm subjectID={subjectID} questionSetID={questionSet.id} />
      )}
    </>
  )
}

export async function getServerSideProps(ctx) {
  const { subjectID, questionSetID } = ctx.params
  if (!ctx.req.cookies.idToken) {
    return {
      redirect: {
        destination: `/subjects/${subjectID}/${questionSetID}`,
        permanent: false,
      },
    }
  }
  const questionSet = await firebase.getQuestionSet(subjectID, questionSetID)
  return { props: { subjectID, questionSet } }
}
