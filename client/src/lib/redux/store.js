import { combineReducers, createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension/developmentOnly'
import { reducer as authReducer } from './auth'
import { reducer as localeReducer } from './locales'
import { reducer as navReducer } from './nav'

const store = createStore(
  combineReducers({
    auth: authReducer,
    locale: localeReducer,
    nav: navReducer,
  }),
  {
    auth: {
      jwt: localStorage.getItem('jwt'),
    },
    locale: {
      code: localStorage.getItem('locale')
      || navigator.languages.find(ln => ['es', 'en'].includes(ln))
      || 'es',
    },
    nav: {
      showSidebar: false,
    }
  },
  devToolsEnhancer({}),
)

export default store
