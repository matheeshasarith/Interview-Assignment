import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <Spinner
      animation='grow'
      role='status'
      variant="primary"
      style={{
        width: '25px',
        height: '25px',
        margin: 'auto',
        display: 'block'
      }}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  )
}

export default Loader
