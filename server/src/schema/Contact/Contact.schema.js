import sendEmail from 'lib/sendEmail'
import Contact from './Contact'

export const schema = `
type Contact{
  id: ID!
  name: String!
  email: String!
  message: String
  
  createdAt: DateTime
  modifiedAt: DateTime
}

extend type RootQuery {
  contact(id: ID!): Contact
  contacts(limit: Int): [Contact]
  contactsCount: Int
}

extend type RootMutation {
  createContact(
    name: String!
    email: String!
    message: String
  ): Contact
  
  deleteContact(id: ID!): Boolean
}
`

export const resolvers = {
  Contact: {},

  RootQuery: {
    contact: (root, { id }) => Contact.get(id),
    contacts: (root, { limit }) => Contact.scan({ Limit: limit }),
    contactsCount: () => Contact.count(),
  },

  RootMutation: {
    createContact(root, { name, company, email, message }) {
      return Contact.create({ name, company, email, message })
        .then(contact => sendEmail({
          from: 'webmaster@huaraz-adventures.com',
          to: ['aldo.funes@icloud.com'],
          subject: 'Nuevo contacto en www.huaraz-adventures.com',
          htmlBody: `
            <h3>Un visitante de www.huaraz-adventures.com quiere ponerse en contacto contigo</h3>
            <ul>
              <li><strong>Nombre</strong>: ${contact.name}</li>
              <li><strong>Correo electrónico</strong>: ${contact.email}</li>
              <li><strong>Mensaje</strong>: ${contact.message}</li>
            </ul>
          `,
          textBody: `
            Un visitante de www.huaraz-adventures.com quiere ponerse en contacto contigo\n\n
            Nombre: ${name}\n
            Correo electrónico: ${email}\n
            Mensaje: ${message}\n
          `,
        })
          .then(() => contact))
    },

    deleteContact: (root, { id }) => Contact.delete(id),
  },
}
