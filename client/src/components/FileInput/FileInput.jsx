import React, { Component } from 'react'
import { bool, func, shape, string } from 'prop-types'
import S3 from 'aws-sdk/clients/s3'
import { format } from 'date-fns'
import { errorType } from 'lib/propTypes'
import { Error, Loading } from 'components'
import styles from './FileInput.scss'

export default class FileInput extends Component {
  static propTypes = {
    data: shape({
      error: errorType,
      loading: bool.isRequired,
      securityToken: shape({
        accessKeyId: string.isRequired,
        secretAccessKey: string.isRequired,
        sessionToken: string.isRequired,
      }),
    }).isRequired,
    className: string,
    onChange: func.isRequired,
  }

  static defaultProps = {
    className: null,
  }

  state = {
    uploading: false,
  }

  handleChange = (event) => {
    const { data: { securityToken }, onChange } = this.props

    const s3 = new S3({
      region: 'us-east-1',
      accessKeyId: securityToken.accessKeyId,
      secretAccessKey: securityToken.secretAccessKey,
      sessionToken: securityToken.sessionToken,
      params: {
        Bucket: 'cdn.huaraz-adventures.com',
      },
    })

    const { files } = event.target

    this.setState({ uploading: true })

    return Promise.all(Array.from(files).map(file => s3.upload({
      Key: `uploads/${format(new Date(), 'YYYY-MM-DD')}/${file.name}`,
      Body: file,
      ContentType: file.type,
    }).promise()
      .then(result => `https://cdn.huaraz-adventures.com/${result.Key}`)))
      .then((urls) => {
        this.setState({ uploading: false })
        return onChange(urls)
      })
      .catch((error) => {
        this.setState({ uploading: false })
        console.log(error)
      })
  }

  render() {
    const { className, data, onChange, ...props } = this.props
    const { uploading } = this.state

    if (data.error) { return <Error error={data.error} /> }
    if (data.loading) { return <Loading /> }

    return (
      <div className={className}>
        <input
          type="file"
          className={styles.input}
          onChange={this.handleChange}
          {...props}
        />
        {uploading && <progress className={styles.progressBar} />}
      </div>
    )
  }
}
