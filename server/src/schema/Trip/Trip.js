import Model from 'lib/Model'

class Trip extends Model {}

export default new Trip({
  tableName: `${process.env.SERVICE_NAME}-trips-${process.env.NODE_ENV}`,
})
