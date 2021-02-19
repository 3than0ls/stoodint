import NotFound from '~/client/components/common/NotFound'
import Questions from '~/client/components/Questions/QuestionSet'
import firebase from '~/client/firebase/Firebase'

export default function QuestionSetHome({ questionSet, subjectID }) {
  return (
    <>
      {questionSet === null ? (
        <NotFound />
      ) : (
        <Questions questionSet={questionSet} subjectID={subjectID} />
      )}
    </>
  )
}

export async function getServerSideProps(ctx) {
  const { subjectID, questionSetID } = ctx.params
  const [subject, questionSet] = await firebase.getQuestionSet(
    subjectID,
    questionSetID
  )

  // should actually be a firebase admin idToken verification
  if (!ctx.req.cookies.idToken && (subject.private || questionSet.private)) {
    return {
      props: { questionSet: null, subjectID }, // can always throw in subject object as a prop if we ever need it
    }
  }

  return {
    props: { questionSet, subjectID },
  }
}
