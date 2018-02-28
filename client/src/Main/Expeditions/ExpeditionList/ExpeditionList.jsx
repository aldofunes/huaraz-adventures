import cx from 'classnames'
import React from 'react'
import { arrayOf, bool, shape, string } from 'prop-types'
import { errorType, expeditionType } from 'lib/propTypes'
import { Error, Loading } from 'components/index'
import i18n from 'lib/i18n'
import translations from './ExpeditionList.i18n.yaml'
import styles from './ExpeditionList.scss'
import ExpeditionCard from './ExpeditionCard/index'

const ExpeditionList = ({ className, data, localeCode }) => {
  if (data.error) { return <Error error={data.error} size="xlarge" /> }
  if (data.loading) { return <Loading size="xlarge" /> }

  i18n.extend(translations[localeCode])

  return (
    <div className={cx(className, styles.container)}>
      {data.expeditions.map(expedition => (
        <ExpeditionCard key={expedition.id} expedition={expedition} />
      ))}
    </div>
  )
}

ExpeditionList.propTypes = {
  className: string,
  data: shape({
    error: errorType,
    loading: bool.isRequired,
    expeditions: arrayOf(expeditionType),
  }).isRequired,
  localeCode: string.isRequired,
}

ExpeditionList.defaultProps = {
  className: null,
}

export default ExpeditionList
