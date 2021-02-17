import NotFound from '~/client/components/common/NotFound'
import firebase from '~/client/firebase/Firebase'

export default function QuestionSetHome({ questionSet }) {
  console.log(questionSet)
  return <>{questionSet === null ? <NotFound /> : <div>hello</div>}</>
}

export async function getServerSideProps(ctx) {
  const { subjectID, questionSetID } = ctx.params
  const questionSet = await firebase.getQuestionSet(subjectID, questionSetID)
  return {
    props: { questionSet },
  }
}
