import React from 'react'

export function Ornament({
  light = false,
  center = false,
}: {
  light?: boolean
  center?: boolean
}) {
  const classes = ['ornament', light ? 'light' : '', center ? 'center' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} aria-hidden="true">
      <i />
      <i />
      <i />
    </div>
  )
}
