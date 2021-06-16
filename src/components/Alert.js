import React from 'react'
import { Alert } from 'react-bootstrap'

const AlertComponent = ({ variant, text }) => {
  return <Alert variant={variant}>{text}</Alert>
}

export default AlertComponent
