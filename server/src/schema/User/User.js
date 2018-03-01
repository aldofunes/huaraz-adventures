import Model from 'lib/Model'

/**
 * Extend the Model and declare a class to interact with DynamoDB
 */
class User extends Model {
  findByEmail(email) {
    return this.query({
      IndexName: 'email',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: { ':email': email },
    }).then(items => items[0])
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
