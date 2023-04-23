import { authService } from '../../services/authService'
// import { userService } from '../../services/userService'

export function login(userCreds) {
  return async dispatch => {
    try {
      dispatch({ type: 'LOADING_START' })
      const user = await authService.login(userCreds)
      dispatch({ type: 'SET_USER', user })
      return user
    } catch (err) {
      dispatch({ type: 'SET_ERROR', err })
      console.log('UserActions: err in login', err)
    } finally {
      dispatch({ type: 'LOADING_DONE' })
    }
  }
}

export function signup(userCreds) {
  return async dispatch => {
    try {
      dispatch({ type: 'LOADING_START' })
      const user = await authService.signup(userCreds)
      dispatch({ type: 'SET_USER', user })
      dispatch({ type: 'ADD_USER', user })
      return user
    } catch (err) {
      dispatch({ type: 'SET_ERROR', err })
      console.log('UserActions: err in signup', err)
    } finally {
      dispatch({ type: 'LOADING_DONE' })
    }
  }
}

export function logout() {
  console.log('logout auth actions');
  return async dispatch => {
    try {
      await authService.logout()
      dispatch({ type: 'SET_USER', user: null })
      dispatch({ type: 'REMOVE_ERROR' })
    } catch (err) {
      dispatch({ type: 'SET_ERROR', err })
      console.log('UserActions: err in logout', err)
    }
  }
}