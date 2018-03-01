import React from 'react'
import PropTypes from 'prop-types'
import draftConvert from 'lib/draftConvert'
import styles from './DraftConvert.scss'

const DraftConvert = ({ content, className }) => (
  <div
    className={`${styles.markdown} ${className}`}
    dangerouslySetInnerHTML={{ __html: draftConvert(content) }}
  />
)

DraftConvert.propTypes = {
  content: PropTypes.string,
  className: PropTypes.string,
}

DraftConvert.defaultProps = {
  className: '',
}

export default DraftConvert
