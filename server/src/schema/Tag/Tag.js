import Model from 'lib/Model'

class Tag extends Model {
  getBySlug(slug) {
    return this.query({
      IndexName: 'slug',
      KeyConditionExpression: 'slug = :slug',
      ExpressionAttributeValues: { ':slug': slug },
    }).then(tags => tags[0])
  }
}

export default new Tag({
  tableName: `${process.env.SERVICE_NAME}-tags-${process.env.NODE_ENV}`,
})
