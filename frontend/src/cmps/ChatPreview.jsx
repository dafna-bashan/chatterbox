import React from 'react'
import userImg from '../assets/img/noun-user-1.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'

export function ChatPreview({ currChatId, chat, loggedInUser, onLoadChat }) {

  const isGroupChat = chat.members.length > 2
  const otherMembers = chat.members.filter(member => member._id !== loggedInUser._id)
  const { msgs } = chat

  return (
    <div className={currChatId === chat._id ? 'chat-preview current' : 'chat-preview'}>
      {isGroupChat ?
        <div className='flex align-center' onClick={() => onLoadChat(chat._id)}>
          {chat.imgUrl ? <img src={chat.imgUrl} alt={chat.title} /> : <div className="group-icon flex align-center justify-center"><FontAwesomeIcon icon={faUserGroup} /></div> }
          <div>
            <div>{chat.title}</div>
            {msgs.length ? <div className='last-msg'>{msgs[msgs.length - 1]?.from.firstName}: {msgs[msgs.length - 1]?.txt}</div> : null}
          </div>
        </div>
        :
        <div className='flex align-center' onClick={() => onLoadChat(chat._id)}>
          <img src={otherMembers[0]?.imgUrl || userImg} alt={otherMembers[0]?.firstName} />
          <div>
            <div>{otherMembers[0]?.firstName} {otherMembers[0]?.lastName}</div>
            <div className='last-msg'>{msgs[msgs.length - 1]?.txt}</div>
          </div>
        </div>
      }
    </div>
  )
}
