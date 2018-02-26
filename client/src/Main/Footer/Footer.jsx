import React from 'react'
import { string } from 'prop-types'
import i18n from 'lib/i18n'
import translations from './Footer.i18n.yaml'
import styles from './Footer.scss'

const Footer = ({ localeCode }) => {
  i18n.extend(translations[localeCode])

  return (
    <footer className={styles.footer}>
      <span aria-label="Built in Mexico with love" role="img">{i18n.t('footer.credits')}️</span>
    </footer>
  )
}

Footer.propTypes = {
  localeCode: string.isRequired,
}

export default Footer
