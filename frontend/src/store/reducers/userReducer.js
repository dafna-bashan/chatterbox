let localLoggedinUser = null
if (sessionStorage.loggedinUser) localLoggedinUser = JSON.parse(sessionStorage.loggedinUser)

const initialState = {
  loggedInUser: localLoggedinUser,
  users: []
}

export function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, loggedInUser: action.user }
    case 'SET_USERS':
      return { ...state, users: [...action.users] }
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.user] };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.userId)
      }
    case 'UPDATE_USER':
      return {
        ...state,
        loggedInUser: action.user,
        users: state.users.map((user) =>
          user._id === action.user._id ? action.user : user
        ),
      };
    default:
      return state
  }
}
