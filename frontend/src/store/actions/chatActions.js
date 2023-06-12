import { chatService } from '../../services/chatService'


export function loadChats(userId) {
  return async dispatch => {
    try {
      console.log('load chats');
      dispatch({ type: 'LOADING_START' })
      const chats = await chatService.query(userId)
      dispatch({ type: 'SET_CHATS', chats })
      return chats
    } catch (err) {
      console.log('ChatActions: err in loadChats', err)
    } finally {
      dispatch({ type: 'LOADING_DONE' })
    }
  }
}

export function loadChat(chatId) {
  return async dispatch => {
    try {
      dispatch({ type: 'LOADING_START' })
      const chat = await chatService.getById(chatId)
      dispatch({ type: 'SET_CHAT', chat })
      return chat
    } catch (err) {
      console.log('ChatActions: err in loadChat', err)
    } finally {
      dispatch({ type: 'LOADING_DONE' })
    }
  }
}

export function addChat(chat) {
  return async dispatch => {
    try {
      dispatch({ type: 'LOADING_START' })
      const newChat = await chatService.add(chat)
      dispatch({ type: 'ADD_CHAT', chat: newChat })
      return newChat
    } catch (err) {
      console.log('ChatActions: err in addChat', err)
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
