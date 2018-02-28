import jwt from 'jsonwebtoken'

export const handler = (event, context, callback) => {
  // Regular expression to extract an access token from
  // Authorization header.
  const bearerTokenPattern = /^Bearer[ ]+([^ ]+)[ ]*$/i

  const token = bearerTokenPattern.exec(event.authorizationToken)

  if (!token) {
    callback('Unauthorized')
  }
  else {
    jwt.verify(token[1], process.env.PRIVATE_KEY, (error, user) => {
      if (error) { callback('Unauthorized')} else {
        callback(null, {
          principalId: user.id,
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
}