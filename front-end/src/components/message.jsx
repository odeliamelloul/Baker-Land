import { Alert } from 'react-bootstrap'
import React from 'react'

const message = ({variant,children}) => {
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    )
}

export default message
