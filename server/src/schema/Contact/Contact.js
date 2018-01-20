import Model from 'lib/Model'

class Contact extends Model {}

export default new Contact({
  tableName: `${process.env.SERVICE_NAME}-contacts-${process.env.NODE_ENV}`,
})
