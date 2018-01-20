import PropTypes, { bool, func, number, object, shape, string, } from 'prop-types'

export const apolloErrorType = shape({
  message: PropTypes.string.isRequired,
  data: PropTypes.object,
})

export const historyType = shape({
  action: PropTypes.string.isRequired,
  block: PropTypes.func.isRequired,
  createHref: PropTypes.func.isRequired,
  go: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  goForward: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired,
  listen: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired,
    state: PropTypes.string,
  }).isRequired,
  push: PropTypes.func.isRequired,
  replace: PropTypes.func.isRequired,
})

export const locationType = shape({
  hash: PropTypes.string.isRequired,
  key: PropTypes.string,
  pathname: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
})

export const matchType = shape({
  params: PropTypes.object.isRequired,
  isExact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
})

export const localeType = shape({
  code: PropTypes.string.isRequired,
})

export const contactType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  company: PropTypes.string,
  createdAt: PropTypes.number,
  email: PropTypes.string,
  message: PropTypes.string,
  modifiedAt: PropTypes.number,
  name: PropTypes.string,
})

export const tourType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
})

export const tripType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  image: PropTypes.string,
  duration: PropTypes.string,
  tours: PropTypes.arrayOf(tourType),
})

export const userType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  email: PropTypes.string,
})
