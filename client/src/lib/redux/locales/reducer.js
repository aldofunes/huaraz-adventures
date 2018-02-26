import { SET_LOCALE } from './actionTypes'

const locale = (state = {}, { type, payload }) => {
  switch (type) {
    case SET_LOCALE:
      localStorage.setItem('locale', payload.code)
      return { code: payload.code }

    default:
      return state
  }
}

export default locale
