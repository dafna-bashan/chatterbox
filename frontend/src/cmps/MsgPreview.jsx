import React from 'react'
import userImg from '../assets/img/noun-user-1.png'
import { useMessageTimestamp } from '../hooks/useTimestamp'

export function MsgPreview({ msg, loggedInUser, isGroupChat }) {

  const [formattedTimestamp, formatTimestamp, setFormattedTimestamp] = useMessageTimestamp(msg.sent)

  return (
    <div className={loggedInUser._id === msg.from._id ? "msg-preview me" : "msg-preview"}>
      <div className={loggedInUser._id === msg.from._id ? "txt me" : "txt other"}>
        {loggedInUser._id !== msg.from._id && isGroupChat && <div className="name">{msg.from.firstName}</div>}
        <div className="msg">{msg.txt}</div>
        <div className="hour">{formattedTimestamp.hour}</div>
      </div>
      <span className={loggedInUser._id === msg.from._id ? "triangle me" : "triangle other"}></span>
      {isGroupChat && loggedInUser._id !== msg.from._id &&
        <img src={msg.from.imgUrl ? msg.from.imgUrl : userImg} alt={msg.from.firstName} />}
    </div>
  )
}
