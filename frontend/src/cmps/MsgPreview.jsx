import React from 'react'

export function MsgPreview({ msg, loggedInUser, isGroupChat }) {
  return (
    <div className={loggedInUser._id === msg.from._id ? "msg-preview me" : "msg-preview"}>
      <div className={loggedInUser._id === msg.from._id ? "txt me" : "txt other"}>
        {loggedInUser._id !== msg.from._id && <div className="name">{msg.from.firstName}</div>}
        <div className="msg">{msg.txt}</div>
      </div>
      <span className={loggedInUser._id === msg.from._id ? "triangle me" : "triangle other"}></span>
      {isGroupChat && loggedInUser._id !== msg.from._id && <img src={msg.from.imgUrl} alt={msg.from.firstName} />}
    </div>
  )
}
