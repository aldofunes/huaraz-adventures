import { CLOSE_SIDEBAR, OPEN_SIDEBAR } from './actionTypes'

const closeSidebar = () => ({ type: CLOSE_SIDEBAR })

const openSidebar = () => ({ type: OPEN_SIDEBAR })

export { openSidebar, closeSidebar }
