import { SES } from 'aws-sdk' // eslint-disable-line node/no-unpublished-require
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
    createContact: (root, { name, company, email, message }) => {
      const ses = new SES({ region: 'eu-west-1' })
      ses.sendEmail({
        Destination: {
          ToAddresses: [process.env.MAIL_TO],
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: `
                    <h3>Someone has filled out the contact form in www.lovis.company:</h3>
                    <ul>
                      <li>Name: ${name}</li>
                      <li>Company: ${company}</li>
                      <li>Email: ${email}</li>
                      <li>Message: ${message}</li>
                    </ul>
                  `,
            },
            Text: {
              Charset: 'UTF-8',
              Data: `
                  Someone has filled out the contact form in www.lovis.company:\n\n
                  Name: ${name}\n
                  Company: ${company}\n
                  Email: ${email}\n
                  Message: ${message}\n
                `,
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: 'New contact from LOVIS Company',
          },
        },
        ReplyToAddresses: ['support@lovis.email'],
        Source: 'LOVIS Company <lovis.company@lovis.co>',
      })
      return Contact.create({ name, company, email, message })
    },

    deleteContact: (root, { id }) => Contact.delete(id),
  },
}
