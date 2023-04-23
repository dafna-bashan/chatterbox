import { userService } from '../../services/userService'


export function loadUsers() {
  return async dispatch => {
    try {
      dispatch({ type: 'LOADING_START' })
      const users = await userService.getUsers()
      dispatch({ type: 'SET_USERS', users })
      return users
    } catch (err) {
      console.log('UserActions: err in loadUsers', err)
    } finally {
      dispatch({ type: 'LOADING_DONE' })
    }
  }
}

export function removeUser(userId) {
  return async dispatch => {
    try {
      await userService.remove(userId)
      dispatch({ type: 'REMOVE_USER', userId })
    } catch (err) {
      console.log('UserActions: err in removeUser', err)
    }
  }
}

export function updateUser(user) {
  return async dispatch => {
    try {
      dispatch({ type: 'LOADING_START' })
      await userService.update(user)
      dispatch({ type: 'UPDATE_USER', user })
    } catch (err) {
      console.log('UserActions: err in updateUser', err)
    }
    finally {
      dispatch({ type: 'LOADING_DONE' })
    }
  }
}
