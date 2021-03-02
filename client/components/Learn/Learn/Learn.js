import React, { useState } from 'react'
import StartInfo from './StartInfo'

export default function Learn({ learn }) {
  //   console.log(learn)
  const [learnStats, setLearnStats] = useState({})
  const [started, setStarted] = useState(false)
  const start = () => setStarted(true)
  return started ? (
    <div>testing</div>
  ) : (
    <StartInfo learn={learn} start={start} />
  )
}
