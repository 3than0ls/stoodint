import Container from '~/client/components/common/Container'

export default function Home() {
  return (
    <Container col>
      <p className="mt-4 text-white text-6xl">Welcome!</p>
      <a
        className="text-4xl mt-4 underline text-app-light-blue-2"
        href="https://github.com/3than0ls/stoodint"
      >
        Check out the unfinished GitHub repo of this project.
      </a>
    </Container>
  )
}
