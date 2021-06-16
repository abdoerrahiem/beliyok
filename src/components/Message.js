import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
  return (
    <Alert variant={variant}>
      <i
        className={
          variant === 'success'
            ? 'fas fa-check-circle'
            : variant === 'warning'
            ? 'fas fa-exclamation-circle'
            : variant === 'danger'
            ? 'fas fa-times-circle'
            : variant === 'info'
            ? 'fas fa-info-circle'
            : ''
        }
      />
      <span className='ml-2'>{children}</span>
    </Alert>
  )
}

export default Message
