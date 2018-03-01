import { generatePassword, hashPassword } from 'lib/auth'
import sendEmail from 'lib/sendEmail'
import User from './User'

export const schema = `
type User {
  id: ID!
  name: String
  email: String!
  isEnabled: Boolean!

  createdAt: DateTime!
  modifiedAt: DateTime!
}

extend type RootQuery {
  user(id: ID!): User @auth
  myUser: User @auth
  users(limit: Int): [User] @auth
  usersCount: Int @auth
}

extend type RootMutation {
  createUser(
    email: String!
    isEnabled: Boolean!
    name: String!
  ): User @auth
  
  updateUser(
    id: ID!
    email: String
    isEnabled: Boolean!
    name: String
  ): User @auth
  
  deleteUser(id: ID!): Boolean @auth
}
`

export const resolvers = {
  User: {},

  RootQuery: {
    user: (root, { id }) => User.get({ id }),
    users: () => User.scan(),
    myUser: (root, args, { userId }) => User.get({ id: userId }),
    usersCount: () => User.count(),
  },

  RootMutation: {
    createUser(root, { name, email }) {
      const password = generatePassword(12)

      return User.findByEmail(email)
        .then(user => { if (user) { throw new Error('User already exists') } })
        .then(() => User.create({
          name,
          email,
          passwordDigest: hashPassword(password),
          isEnabled: true,
        }))
        .then(user => sendEmail({
          from: 'webmaster@huaraz-adventures.com',
          to: [user.email],
          subject: 'Bienvenido a www.huaraz-adventures.com',
          htmlBody: `
            <h3>
              Un administrador te ha dado permisos para ingresar al sitio 
              <a href="https://www.huaraz-adventures.com/admin">www.huaraz-adventures.com/admin</a>
            </h3>
            
            <dl>
              <dt>Usuario</dt>
              <dd>${user.email}</dd>
              <br>
              
              <dt>Contaseña</dt>
              <dd>${password}</dd>
            </dl>
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
      return User.update({ id }, args)
    },

    deleteUser(root, { id }) {
      return User.delete({ id })
    },
  },
}
