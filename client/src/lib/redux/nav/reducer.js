import { CLOSE_SIDEBAR, OPEN_SIDEBAR } from './actionTypes'

export default (state = [], { type }) => {
  switch (type) {
    case CLOSE_SIDEBAR:
      return { showSidebar: false, ...state }

    case OPEN_SIDEBAR:
      return { showSidebar: true, ...state }

    default:
      return state
  }
}
