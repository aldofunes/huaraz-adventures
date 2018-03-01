import JWT from 'jsonwebtoken'
import { verifyPassword } from 'lib/auth'
import { NotFoundError, UnauthorizedError } from 'lib/errors'
import User from 'schema/User'

/**
 * Lambda function that executes GraphQL queries.
 * It is behind a custom authorizer, therefore calls to this handler are already authenticated
 *
 * @param {Object} event - API Gateway provided event data
 * @param {Object} context - API Gateway provided context
 * @param callback
 */
export const handler = (event, context, callback) => {
  const { email, password } = JSON.parse(event.body)

  User.query({
    IndexName: 'email',
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: { ':email': email },
  })
    .then(users => users[0])
    .then(user => {
      if (!user) { throw new NotFoundError({ message: 'User was not found' }) }
      if (!user.isEnabled) { throw new UnauthorizedError({ message: 'User is not enabled' }) }

      // In the database we store the hashed password along with the hashing salt.
      // Here we need to verify that the password's hash is equal to the one in our database.
      // We have extracted that functionality to `lib/auth.js`
      return verifyPassword(password, user.passwordDigest)
        .then((passwordIsValid) => {
          if (!passwordIsValid) {
            // Return an error if the password does not match with the hash in the database
            throw new UnauthorizedError({ message: 'Password is wrong' })
          }

          // Build the JSON Web Token with the user data, a private key for the signature and
          // an expiration for advanced security
          callback(
            null,
            {
              statusCode: 200,
              headers: {
                'Access-Control-Allow-Origin': '*',
              },
              body: JSON.stringify({ jwt: JWT.sign({ id: user.id }, process.env.PRIVATE_KEY) }),
            },
          )
        })
    })
    .catch(error => { callback(error) })
}
