import React from 'react'
import { MsgPreview } from './MsgPreview'

export function MsgList({ msgs }) {
    return (
        <div className="msg-list full">
            {msgs.map((msg, idx) => <MsgPreview key={idx} msg={msg} />)}
        </div>
    )
}
