import React from 'react'
import classes from './Button.module.scss'

export default props => {
  const cls = [
    classes.Button,
    classes[props.type]
  ]

  return (
    <button
      className={cls.join(' ')}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

 