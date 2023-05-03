const initialState = {
  chats: [],
  currChat: {
    _id: "",
    title: "",
    description: "",
    members: [],
    msgs: []
  }
}

export function chatReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_CHAT':
      return { ...state, currChat: action.chat }
    case 'SET_CHATS':
      return { ...state, chats: [...action.chats] }
    case 'ADD_CHAT':
      return { ...state, currChat: action.chat, chats: [...state.chats, action.chat] };
    case 'REMOVE_CHAT':
      return {
        ...state,
        users: state.chats.filter(chat => chat._id !== action.chatId)
      }
    case 'UPDATE_CHAT':
      return {
        ...state,
        currChat: action.chat,
        chats: state.chats.map((chat) =>
          chat._id === action.chat._id ? action.chat : chat
        ),
      };
    default:
      return state
  }
}
