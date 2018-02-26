import React from 'react'
import { oneOf, shape, string } from 'prop-types'
import cx from 'classnames'
import styles from './Error.scss'

const Error = ({ size, error }) => (
  <div className={cx(styles.container, styles[size])}>
    <div>
      <h3 className={styles.header}>Error</h3>

      {error.graphQLErrors
        ? error.graphQLErrors.map(err => (
          <p key={err.message} className={styles.text}>
            {`[${err.data ? err.data.statusCode : 400}] ${err.message}`}
          </p>
        ))
        : <p className={styles.text}>{error.message}</p>}
    </div>
  </div>
)

Error.propTypes = {
  size: oneOf(['small', 'medium', 'large', 'xlarge']),
  error: shape({
    name: string,
    message: string,
  }).isRequired,
}

Error.defaultProps = {
  size: 'medium',
}

export default Error
