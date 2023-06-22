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

export function loadUser(userId) {
  console.log('load user');
  return async dispatch => {
    try {
      dispatch({ type: 'LOADING_START' })
      const user = await userService.getById(userId)
      dispatch({ type: 'SET_USER', user })
      return user
    } catch (err) {
      console.log('UserActions: err in loadUser', err)
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

export function updateUser(user, isLoggedIn) {
  return async dispatch => {
    try {
      dispatch({ type: 'LOADING_START' })
      await userService.update(user)
      dispatch({ type: 'UPDATE_USER', user })
      if (isLoggedIn) dispatch({ type: 'SET_USER', user })
    } catch (err) {
      console.log('UserActions: err in updateUser', err)
    }
    finally {
      dispatch({ type: 'LOADING_DONE' })
    }
  }
}
