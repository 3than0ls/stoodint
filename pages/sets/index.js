import Navbar from '~/components/Navbar/Navbar'
import Form from '~/components/QuestionForm/Form'
import SetsNav from '~/components/SetNav/SetsNav'
import firebase from '~/firebase/Firebase'

export default function Sets({ questionSets }) {
  return (
    <>
      <SetsNav questionSets={questionSets} />
    </>
  )
}

export async function getStaticProps() {
  const questionSets = await firebase.getQuestionSets()
  return {
    props: { questionSets },
  }
}
