import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/fontawesome-free-solid'
import styles from './Loading.scss'

const Loading = ({ size }) => (
  <div
    className={cx(styles.container, {
      [styles.padSmall]: size === 'small',
      [styles.padMedium]: size === 'medium',
      [styles.padLarge]: size === 'large',
      [styles.padXlarge]: size === 'xlarge',
    })}
  >
    <FontAwesomeIcon
      icon={faSpinner}
      className={cx(styles.spinner, {
        [styles.small]: size === 'small',
        [styles.medium]: size === 'medium',
        [styles.large]: size === 'large',
        [styles.xlarge]: size === 'xlarge',
      })}
    />
  </div>
)

Loading.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
}

Loading.defaultProps = {
  size: 'medium'
}

export default Loading
