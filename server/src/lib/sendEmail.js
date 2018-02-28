import { SES } from 'aws-sdk' // eslint-disable-line node/no-unpublished-require

const ses = new SES({ region: 'us-east-1' })

/**
 * Send an email using default SES config
 * @param from
 * @param htmlBody
 * @param reply
 * @param subject
 * @param textBody
 * @param to
 */
export default ({ from, htmlBody, reply, subject, textBody, to }) => {
  return ses.sendEmail({
    Destination: {
      ToAddresses: to,
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: htmlBody,
        },
        Text: {
          Charset: 'UTF-8',
          Data: textBody,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
    },
    ReplyToAddresses: [reply],
    Source: from,
  }).promise()
}
