import React from 'react'
import { ChatPreview } from './ChatPreview'

export function ChatList({ chats, loggedInUser }) {
  return (
    <div>
      {chats.map(chat => <ChatPreview chat={chat} loggedInUser={loggedInUser}/>)}
    </div>
  )
}
