export const findTranslation = (doc, localeCode) => {
  if (!doc) { return {} }
  return doc.find(i => i.localeCode === localeCode) || doc[0]
}
