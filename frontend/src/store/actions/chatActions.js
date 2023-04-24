import { chatService } from '../../services/chatService'


export function loadChats() {
  return async dispatch => {
    try {
      dispatch({ type: 'LOADING_START' })
      const chats = await chatService.query()
      dispatch({ type: 'SET_CHATS', chats })
      return chats
    } catch (err) {
      console.log('ChatActions: err in loadChats', err)
    } finally {
      dispatch({ type: 'LOADING_DONE' })
    }
  }
}

export function loadChat() {
  return async dispatch => {
    try {
      dispatch({ type: 'LOADING_START' })
      const chat = await chatService.getById()
      dispatch({ type: 'SET_CHAT', chat })
      return chat
    } catch (err) {
      console.log('ChatActions: err in loadChat', err)
    } finally {
      dispatch({ type: 'LOADING_DONE' })
    }
  }
}

export function removeChat(chatId) {
  return async dispatch => {
    try {
      await chatService.remove(chatId)
      dispatch({ type: 'REMOVE_CHAT', chatId })
    } catch (err) {
      console.log('ChatActions: err in removeChat', err)
    }
  }
}

export function updateChat(chat) {
  return async dispatch => {
    try {
      dispatch({ type: 'LOADING_START' })
      await chatService.update(chat)
      dispatch({ type: 'UPDATE_CHAT', chat })
    } catch (err) {
      console.log('ChatActions: err in updateChat', err)
    }
    finally {
      dispatch({ type: 'LOADING_DONE' })
    }
  }
}
