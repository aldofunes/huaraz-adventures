import docClient from 'lib/docClient'
import Model from 'lib/Model'

class Expedition extends Model {
  findBySlug(slug) {
    return docClient.query({
      TableName: this.tableName,
      IndexName: 'slug',
      KeyConditionExpression: 'slug = :slug',
      ExpressionAttributeValues: { ':slug': slug },
    }).promise().then(data => data.Items[0])
  }
}

export default new Expedition({
  tableName: `${process.env.SERVICE_NAME}-expeditions-${process.env.NODE_ENV}`,
})
