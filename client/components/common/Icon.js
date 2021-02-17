import React from 'react'

const iconsContext = require.context('~/client/icons', true, /js$/)

export function Icon({ name, ...props }) {
  const Icon = iconsContext(`./${name}.js`).default
  return <Icon {...props} />
}
