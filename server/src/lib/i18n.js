export const findTranslation = (doc, localeCode) => {
  return doc.find(i => i.localeCode === localeCode) || doc[0]
}
