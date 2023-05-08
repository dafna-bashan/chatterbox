import React from 'react'

export function ChatPreview({ chat, loggedInUser, onLoadChat }) {

  const isGroupChat = chat.members.length > 2
  const otherMembers = chat.members.filter(member => member._id !== loggedInUser._id)
  const { msgs } = chat

  return (
    <div className="chat-preview">
      {isGroupChat &&
        <div onClick={() => onLoadChat(chat._id)}>
          <div>{chat.title}</div>
          <div>{msgs[msgs.length - 1].from.firstName}: {msgs[msgs.length - 1]?.txt}</div>
        </div>
      }
      {!isGroupChat &&
        <div onClick={() => onLoadChat(chat._id)}>
          <div>{otherMembers[0]?.firstName} {otherMembers[0]?.lastName}</div>
          <div>{msgs[msgs.length - 1]?.txt}</div>
        </div>
      }
    </div>
  )
}
