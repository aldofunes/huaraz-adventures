import User from './User'
import { resolvers, schema } from './User.schema'

/**
 * The DynamoDB table name
 * @type {string}
 */
const tableName = `${process.env.SERVICE_NAME}-users-${process.env.NODE_ENV}`

export default User
export { resolvers, schema, tableName }