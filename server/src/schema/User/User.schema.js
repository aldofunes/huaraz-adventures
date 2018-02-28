import { SES } from 'aws-sdk'
import { generatePassword, hashPassword } from 'lib/auth'
import sendEmail from 'lib/sendEmail'
import User from './User'

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
    myUser: (root, args, { userId }) => User.get(userId),
    usersCount: () => User.count(),
  },

  RootMutation: {
    createUser(root, { name, email }) {
      const password = generatePassword(12)

      const ses = new SES

      return User.create({
        name,
        email,
        passwordDigest: hashPassword(password),
      })
        .then(user => sendEmail({
          from: 'webmaster@huaraz-adventures.com',
          to: ['aldo.funes@icloud.com'],
          subject: 'Bienvenido a www.huaraz-adventures.com',
          htmlBody: `
            <h3>
              Un administrador te ha dado permisos para ingresar al sitio 
              <a href="https://www.huaraz-adventures.com/admin">www.huaraz-adventures.com/admin</a>
            </h3>
            <ul>
              <li><strong>Usuario</strong>: ${user.email}</li>
              <li><strong>Contaseña</strong>: ${password}</li>
            </ul>
          `,
          textBody: `
            Un administrador te ha dado permisos para ingresar
            al sitio www.huaraz-adventures.com/admin\n\n
            Usuario: ${name}\n
            Contraseña: ${password}\n
          `,
        })
          .then(() => user))
    },

    updateUser(root, { id, ...args }) {
      return User.update(id, args)
    },

    deleteUser(root, { id }) {
      return User.delete(id)
    },
  },
}
