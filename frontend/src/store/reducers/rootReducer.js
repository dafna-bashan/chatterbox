import { combineReducers } from 'redux'
import { errorReducer } from './errorReducer'
import { userReducer } from './userReducer'
import { systemReducer } from './systemReducer'
import { chatReducer } from './chatReducer'


export const rootReducer = combineReducers({
  userModule: userReducer,
  chatModule: chatReducer,
  systemModule: systemReducer,
  errorModule: errorReducer

})
