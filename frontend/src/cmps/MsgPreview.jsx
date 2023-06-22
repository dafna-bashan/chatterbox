import React from 'react'

export function MsgPreview({ msg, loggedInUser }) {
  return (
    <div className={loggedInUser._id === msg.from._id ? "msg-preview me" : "msg-preview"}>
      <div className={loggedInUser._id === msg.from._id ? "me" : "other"}>
        <div className="name">{msg.from.firstName}</div>
        <div className="msg">{msg.txt}</div>
      </div>

    </div>
  )
}
