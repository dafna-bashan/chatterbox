import { combineReducers } from 'redux'
import { errorReducer } from './errorReducer'
import { userReducer } from './userReducer'
import { systemReducer } from './systemReducer'


export const rootReducer = combineReducers({
  systemModule: systemReducer,
  userModule: userReducer,
  errorModule: errorReducer

})
