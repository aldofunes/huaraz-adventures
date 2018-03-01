import { Error, Loading } from 'components'
import PropTypes from 'prop-types'
import React from 'react'
import ChangePassword from './ChangePassword'
import styles from './Profile.scss'

const Profile = ({ data }) => {
  if (data.error) { return <Error error={data.error} size="xlarge" /> }
  if (data.loading) { return <Loading size="xlarge" /> }

  return (
    <div>
      <div className={styles.container}>
        <a target="_blank" href="https://gravatar.com">
          <img className={styles.avatar} src={data.user.avatar} alt="" />
        </a>
        <h1>{data.user.name}</h1>
        <h3>{data.user.email}</h3>
      </div>

      <ChangePassword userId={data.user.id} />
    </div>
  )
}

Profile.propTypes = {
  test: PropTypes.string,
}

export default Profile
