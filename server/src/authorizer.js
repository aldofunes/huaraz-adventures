import jwt from 'jsonwebtoken'
import User from 'schema/User'

export const handler = (event, context, callback) => {
  // Regular expression to extract an access token from
  // Authorization header.
  const bearerTokenPattern = /^Bearer[ ]+([^ ]+)[ ]*$/i

  const token = bearerTokenPattern.exec(event.authorizationToken)

  if (!token) {
    callback('Unauthorized')
  } else {
    jwt.verify(token[1], process.env.PRIVATE_KEY, (error, { id }) => {
      if (error) { callback('Unauthorized')} else {
        User.get({ id }).then(user => {
          if (!user) { callback('Unauthorized') } else {
            callback(null, {
              principalId: id,
              policyDocument: {
                Version: '2012-10-17',
                Statement: [
                  {
                    Action: 'execute-api:Invoke',
                    Effect: 'Allow',
                    Resource: '*',
                  },
                ],
              },
            })
          }
        })
      }
    })
  }
}