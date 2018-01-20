import docClient from 'lib/docClient'
import Model from 'lib/Model'

class Tour extends Model {
  findBySlug(slug) {
    return docClient.query({
      TableName: this.tableName,
      IndexName: 'slug',
      KeyConditionExpression: 'slug = :slug',
      ExpressionAttributeValues: { ':slug': slug },
    }).promise().then(data => data.Items[0])
  }
}

export default new Tour({
  tableName: `${process.env.SERVICE_NAME}-tours-${process.env.NODE_ENV}`,
})
