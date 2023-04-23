const initialState = {
  isLoading: false,
  isSuccessful: false
};

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'RESTART':
      return { ...state, isLoading: false, isSuccessful: false }
    case 'LOADING_START':
      return { ...state, isLoading: true, isSuccessful: false }
    case 'LOADING_DONE':
      return { ...state, isLoading: false, isSuccessful: true }
    default: return state
  }
}
