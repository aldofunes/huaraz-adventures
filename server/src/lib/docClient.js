import { DynamoDB } from 'aws-sdk' // eslint-disable-line node/no-unpublished-require

export default new DynamoDB.DocumentClient({
  endpoint: process.env.DYNAMODB_ENDPOINT,
  region: 'us-east-1',
})
