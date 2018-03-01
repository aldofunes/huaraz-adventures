import crypto from 'crypto'
import { generatePassword, hashPassword, verifyPassword } from 'lib/auth'
import { ForbiddenError } from 'lib/errors'
import sendEmail from 'lib/sendEmail'
import zxcvbn from 'zxcvbn'
import User from './User'

export const schema = `
type User {
  id: ID!
  avatar: String!
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
  
  changePassword(
    id: ID!
    password: String!
    newPassword: String!
    verificationPassword: String!
  ): User @auth
  
  deleteUser(id: ID!): Boolean @auth
}
`

export const resolvers = {
  User: {
    avatar({ email }) {
      const hash = crypto
        .createHash('md5')
        .update(email.trim().toLowerCase())
        .digest('hex')
      return `https://www.gravatar.com/avatar/${hash}?d=mm&s=280`
    },
  },

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

    changePassword(root, { id, password, newPassword, verificationPassword }) {
      if (newPassword !== verificationPassword) {
        // Return an error if the password does not match with the hash in the database
        throw new ForbiddenError({ message: 'La contraseña no es igual a la verificación' })
      }

      if (zxcvbn(newPassword).score < 3) {
        // Return an error if the password does not match with the hash in the database
        throw new ForbiddenError({ message: 'La nueva contraseña es demasiado débil' })
      }

      return User.get({ id }).then(user => {
        return verifyPassword(password, user.passwordDigest).then((passwordIsValid) => {
          if (!passwordIsValid) {
            // Return an error if the password does not match with the hash in the database
            throw new ForbiddenError({ message: 'Contraseña incorrecta' })
          }

          return User.update({ id }, { passwordDigest: hashPassword(newPassword) })
        })
      })
    },

    deleteUser(root, { id }) {
      return User.delete({ id })
    },
  },
}
