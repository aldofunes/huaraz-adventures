import { LOCALE_SET } from './actionTypes'

const locale = (state = [], { type, ...rest }) => {
  switch (type) {
    case LOCALE_SET:
      localStorage.setItem('locale', rest.code)
      return { code: rest.code }

    default:
      return state
  }
}

export default locale
