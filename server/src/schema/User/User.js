import JWT from 'jsonwebtoken'
import docClient from 'lib/docClient'
import Model from 'lib/Model'

/**
 * Extend the Model and declare a class to interact with DynamoDB
 */
class User extends Model {
  findByEmail(email) {
    return docClient.query({
      TableName: this.tableName,
      IndexName: 'email',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: { ':email': email },
    }).promise().then(data => data.Items[0])
  }

  findByJwt(jwt) {
    return new Promise((resolve, reject) => {
      JWT.verify(jwt, process.env.PRIVATE_KEY, (error, user) => {
        if (error) { reject(error) } else { resolve(user) }
      })
    })
      .then(user => docClient.get({ TableName: this.tableName, Key: { id: user.id } }).promise())
      .then(data => data.Item)
  }
}

/**
 * The DynamoDB table name
 * @type {string}
 */
export const tableName = `${process.env.SERVICE_NAME}-users-${process.env.NODE_ENV}`

/**
 * Export the User model
 */
export default new User({ tableName })
