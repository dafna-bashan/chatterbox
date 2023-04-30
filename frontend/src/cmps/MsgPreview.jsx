import React from 'react'

export function MsgPreview({ msg }) {
  return (
    <div className="msg-preview">{msg.txt}</div>
  )
}
