import { STS } from 'aws-sdk'

const sts = new STS()

export const schema = `
type SecurityToken {
  accessKeyId: String!
  secretAccessKey: String!
  sessionToken: String!
  expiration: String!
}

extend type RootQuery {
  s3SecurityToken: SecurityToken
}
`

export const resolvers = {
  RootQuery: {
    s3SecurityToken: (root, args, { userId }) => sts.assumeRole({
      RoleArn: process.env.AWS_ROLE_S3_UPLOADS,
      RoleSessionName: userId,
    }).promise()
      .then(({ Credentials }) => ({
        accessKeyId: Credentials.AccessKeyId,
        secretAccessKey: Credentials.SecretAccessKey,
        sessionToken: Credentials.SessionToken,
        expiration: Credentials.Expiration,
      })),
  },
}
