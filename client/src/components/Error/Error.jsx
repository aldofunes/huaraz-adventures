import React from 'react'
import PropTypes from 'prop-types'
import styles from './Error.scss'

const ErrorComponent = ({ statusCode, message }) => (
  <div key={message}>
    <h3 className={styles.text}>Error - {statusCode}</h3>
    <p className={styles.text}>{message}</p>
  </div>
)

ErrorComponent.propTypes = {
  message: PropTypes.string,
  statusCode: PropTypes.string,
}

const Error = ({ size = 'medium', error }) => (
  <div className={styles.container}>
    {error.graphQLErrors
      ? error.graphQLErrors.map(err => (
        <ErrorComponent
          key={err.message}
          statusCode={err.statusCode}
          message={err.message}
        />
      ))
      : <ErrorComponent message={error.message} statusCode={error.name} />}
  </div>
)

Error.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  error: PropTypes.shape({
    name: PropTypes.string,
    message: PropTypes.string,
  }),
}

export default Error
