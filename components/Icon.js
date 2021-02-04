import React from 'react'
const iconsContext = require.context('~/icons', true, /js$/)

export function Icon({ name }) {
  const Icon = iconsContext(`./${name}.js`).default
  return <Icon />
}
