import { LOCALE_SET } from './actionTypes'

const localeSet = code => ({
  type: LOCALE_SET,
  code,
})

export { localeSet }
