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
  contact(id: ID!): Contact @auth
  contacts(limit: Int): [Contact] @auth
  contactsCount: Int @auth
}

extend type RootMutation {
  createContact(
    name: String!
    email: String!
    message: String
  ): Contact
  
  deleteContact(id: ID!): Boolean @auth
}
`

export const resolvers = {
  Contact: {},

  RootQuery: {
    contact: (root, { id }) => Contact.get({ id }),
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
            <dl>
              <dt>Nombre</dt>
              <dd>${contact.name}</dd>
              <br>
              
              <dt>Correo electrónico</dt>
              <dd>${contact.email}</dd>
              <br>

              <dt>Mensaje</dt>
              <dd>${contact.message}</dd>
            </dl>
          `,
          textBody: `
            Un visitante de www.huaraz-adventures.com quiere ponerse en contacto contigo\n\n
            
            Nombre:\n
            ${name}\n\n
            
            Correo electrónico:\n
            ${email}\n\n
            
            Mensaje:\n
            ${message}\n\n
          `,
        })
          .then(() => contact))
    },

    deleteContact: (root, { id }) => Contact.delete({ id }),
  },
}
