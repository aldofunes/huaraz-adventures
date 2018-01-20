import JWT from 'jsonwebtoken'
import uuid from 'uuid'
import { authorize, generatePassword, hashPassword, verifyPassword } from 'lib/auth'
import { NotFoundError, UnauthorizedError } from 'lib/errors'
import docClient from 'lib/docClient'
import User from './User'
import { tableName } from './index'

export const schema = `
type User {
  id: ID!
  name: String
  email: String!
  createdAt: DateTime!
  modifiedAt: DateTime!
}

extend type RootQuery {
  user(id: ID!): User
  myUser: User
  users(limit: Int): [User]
  usersCount: Int
}

extend type RootMutation {
  signIn(
    email: String!
    password: String!
  ): String
  
  createUser(
    name: String!
    email: String!
  ): User
  
  updateUser(
    id: ID!
    name: String
    email: String
  ): User
  
  deleteUser(id: ID!): Boolean
}
`

export const resolvers = {
  User: {},

  RootQuery: {
    user: (root, { id }) => User.get(id),
    users: () => User.scan(),
    myUser: (root, args, { jwt }) => User.findByJwt(jwt),
    usersCount: () => User.count(),
  },

  RootMutation: {
    signIn: (root, { email, password }) => User.query({
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
          return JWT.sign({
            id: user.id,
            email: user.email,
          }, process.env.PRIVATE_KEY)
        })
    }),

    createUser: (root, { name, email }) => {
      const id = uuid.v4()
      doc.createdAt = Date.now()
      doc.modifiedAt = Date.now()
      return docClient.put({
        TableName: tableName,
        Item: doc,
        ConditionalExpression: 'attribute_not_exists(id)',
      }).promise().then(() => doc)

      const password = generatePassword(12)
      return User.create({
        name,
        email,
        passwordDigest: hashPassword(password),
      }).then(user => user)
    },

    updateUser: (root, { id, ...args }, { jwt }) => authorize(jwt)
      .then(() => User.update(id, args)),

    deleteUser: (root, { id }, { jwt }) => authorize(jwt)
      .then(() => User.delete(id)),
  },
}
