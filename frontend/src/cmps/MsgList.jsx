import React, { useEffect, useRef } from 'react'
import { MsgPreview } from './MsgPreview'

export function MsgList({ msgs }) {

    const msgsEndRef = useRef(null)

    const scrollToBottom = () => {
        msgsEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [msgs.length]);

    return (
        <div className="msg-list full">
            {msgs.map((msg, idx) => <MsgPreview key={idx} msg={msg} />)}
            <div ref={msgsEndRef}></div>
        </div>
    )
}
