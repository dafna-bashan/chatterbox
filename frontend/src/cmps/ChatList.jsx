import React from 'react'
import { ChatPreview } from './ChatPreview'

export function ChatList({ chats, loggedInUser, onLoadChat }) {
  return (
    <div>
      {chats.map(chat => <ChatPreview key={chat._id} chat={chat} loggedInUser={loggedInUser} onLoadChat={onLoadChat}/>)}
    </div>
  )
}
