import React from 'react'
import { Icon } from './Icon'

export default function SmallLoading() {
  const colors = ['#4a86e8', '#3d85c6', '#6fa8dc']
  return (
    <div className="w-full flex justify-center">
      {colors.map((color, index) => (
        <Icon
          className={`mx-4 animate-spin ${
            index % 2 === 1 ? ' rotate-22.5 ' : ''
          }`}
          key={index}
          name="gear"
          color={color}
          width={42}
          height={42}
        />
      ))}
    </div>
  )
}
