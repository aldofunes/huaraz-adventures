import React, { Component } from 'react'
import PropTypes from 'prop-types'
import S3 from 'aws-sdk/clients/s3'
import uuid from 'uuid'
import { apolloErrorType } from 'lib/propTypes'
import { Error, Loading } from 'components'
import styles from './FileInput.scss'

export default class FileInput extends Component {
  static propTypes = {
    accept: PropTypes.string,
    error: apolloErrorType,
    loading: PropTypes.bool.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    securityToken: PropTypes.shape({
      accessKeyId: PropTypes.string.isRequired,
      secretAccessKey: PropTypes.string.isRequired,
      sessionToken: PropTypes.string.isRequired,
    }),
  }

  static defaultProps = {
    error: null,
    className: null,
  }

  state = {
    progress: null,
  }

  handleChangeFile = event => {
    const { securityToken, onChange } = this.props

    const s3 = new S3({
      region: 'us-east-1',
      accessKeyId: securityToken.accessKeyId,
      secretAccessKey: securityToken.secretAccessKey,
      sessionToken: securityToken.sessionToken,
      params: {
        Bucket: 'cdn.huaraz-adventures.com',
      },
    })

    const file = event.target.files[0]

    s3.upload({
      Key: `uploads/${uuid.v4()}.${file.name.split('.').pop()}`,
      Body: file,
      ContentType: file.type,
    }, (error, result) => {
      if (error) {
        console.error(error)
      }

      if (result) {
        onChange(`https://cdn.huaraz-adventures.com/${result.Key}`)
        this.setState({ progress: null })
      }
    })
      .on('httpUploadProgress', ({ loaded, total }) => {
        this.setState({ progress: Math.round((loaded / total) * 100) })
      })

  }

  render() {
    const { id, accept, className, error, loading, ref } = this.props
    const { progress } = this.state

    if (error) { return <Error error={error} /> }
    if (loading) { return <Loading /> }

    return (
      <div className={className}>
        <input
          ref={ref}
          id={id}
          type="file"
          className={styles.input}
          onChange={this.handleChangeFile}
          accept={accept}
        />
        {progress && <progress max="100" value={progress} className={styles.progressBar} />}
      </div>
    )
  }
}
