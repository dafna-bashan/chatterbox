import React from 'react'

export function ChatPreview({ chat, loggedInUser }) {

  const isGroupChat = chat.members.length > 2
  const otherMembers = chat.members.filter(member => member._id !== loggedInUser._id)

  const { msgs } = chat
  return (
    <div className="chat-preview">
      {isGroupChat &&
        <div>
          <div>{chat.title}</div>
          <div>{msgs[msgs.length - 1].from.firstName}: {msgs[msgs.length - 1].txt}</div>
        </div>
      }
      {!isGroupChat &&
        <div>
          <div>{otherMembers.firstName} {otherMembers.lastName}</div>
          <div>{msgs[msgs.length - 1].txt}</div>
        </div>
      }
    </div>
  )
}
