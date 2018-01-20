import docClient from 'lib/docClient'
import Model from 'lib/Model'

class Service extends Model {
  findBySlug(slug) {
    return docClient.query({
      TableName: this.tableName,
      IndexName: 'slug',
      KeyConditionExpression: 'slug = :slug',
      ExpressionAttributeValues: { ':slug': slug },
    }).promise().then(data => data.Items[0])
  }
}

export default new Service({
  tableName: `${process.env.SERVICE_NAME}-services-${process.env.NODE_ENV}`,
})
