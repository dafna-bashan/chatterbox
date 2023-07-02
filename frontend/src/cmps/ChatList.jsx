import React from 'react'
import { ChatPreview } from './ChatPreview'

export function ChatList({ currChatId, chats, loggedInUser, onLoadChat }) {
  return (
    <div>
      {chats.map(chat => <ChatPreview key={chat._id} currChatId={currChatId} chat={chat} loggedInUser={loggedInUser} onLoadChat={onLoadChat}/>)}
    </div>
  )
}
