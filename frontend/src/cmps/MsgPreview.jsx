import React from 'react'

export function MsgPreview({ msg }) {
  return (
    <div className="msg-preview">
      <div>{msg.from.firstName}</div>
      <div>{msg.txt}</div> 

    </div>
  )
}
