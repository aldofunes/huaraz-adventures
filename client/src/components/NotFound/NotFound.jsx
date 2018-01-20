import React from 'react'
import styles from './NotFound.scss'

const NotFound = () => (
  <div className={styles.container}>
    <h1>The route you were looking for does not exist</h1>
    <p>Check the url and try again</p>
  </div>
)

export default NotFound
