import React from 'react'
import CreateSubject from '~/client/components/SubjectForm/CreateSubject'

export default function Create() {
  return <CreateSubject />
}

export function getServerSideProps(ctx) {
  if (!ctx.req.cookies.loggedIn) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return { props: {} }
}
