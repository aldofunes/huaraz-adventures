import { bool, func, number, object, shape, string, arrayOf } from 'prop-types'

export const apolloErrorType = shape({
  message: string.isRequired,
  data: object,
})

export const historyType = shape({
  action: string.isRequired,
  block: func.isRequired,
  createHref: func.isRequired,
  go: func.isRequired,
  goBack: func.isRequired,
  goForward: func.isRequired,
  length: number.isRequired,
  listen: func.isRequired,
  location: shape({
    pathname: string.isRequired,
    search: string.isRequired,
    hash: string.isRequired,
    state: string,
  }).isRequired,
  push: func.isRequired,
  replace: func.isRequired,
})

export const locationType = shape({
  hash: string.isRequired,
  key: string,
  pathname: string.isRequired,
  search: string.isRequired,
})

export const matchType = shape({
  params: object.isRequired,
  isExact: bool.isRequired,
  path: string.isRequired,
  url: string.isRequired,
})

export const localeType = shape({
  code: string.isRequired,
})

export const contactType = shape({
  id: string.isRequired,
  createdAt: number,
  modifiedAt: number,

  company: string,
  email: string,
  message: string,
  name: string,
})

export const tourType = shape({
  id: string.isRequired,
  createdAt: number,
  modifiedAt: number,

  name: string,
})

export const tripType = shape({
  id: string.isRequired,
  createdAt: number,
  modifiedAt: number,

  title: string,
  image: string,
  duration: string,
  tours: arrayOf(tourType),
})

export const userType = shape({
  id: string.isRequired,
  createdAt: number,
  modifiedAt: number,

  email: string,
})

export const tagType = shape({
  id: string.isRequired,
  createdAt: number,
  modifiedAt: number,

  name: string,
  slug: string,
})
