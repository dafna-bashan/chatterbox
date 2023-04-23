const initialState = {
    error: null
}

export function errorReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_ERROR':
            return { error: action.err.response.data.err }
            // return { error: '' + action.err }

        case 'REMOVE_ERROR':
            return { error: null }
        default:
            return state
    }
}
