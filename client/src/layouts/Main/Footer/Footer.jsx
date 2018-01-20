import React from 'react'
import { localeType } from 'lib/propTypes'
import i18n from 'lib/i18n'
import translations from './Footer.i18n.yaml'
import styles from './Footer.scss'

const Footer = ({ locale }) => {
  i18n.extend(translations[locale.code])

  return (
    <footer className={styles.footer}>
      <span aria-label="Built in Mexico with love" role="img">Built in 🇲🇽 with ❤️</span>
    </footer>
  )
}

Footer.propTypes = {
  locale: localeType,
}

export default Footer
