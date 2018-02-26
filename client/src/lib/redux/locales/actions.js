import { SET_LOCALE } from './actionTypes'

const setLocale = code => ({
  type: SET_LOCALE,
  payload: { code },
})

export { setLocale }
