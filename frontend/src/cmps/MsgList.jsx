import React, { useEffect, useRef } from 'react'
import { MsgPreview } from './MsgPreview'

export function MsgList({ msgs, loggedInUser }) {

    const msgsEndRef = useRef(null)

    const scrollToBottom = () => {
        msgsEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [msgs.length]);

    return (
        <div className="msg-list full">
            {msgs.map((msg, idx) => <MsgPreview key={idx} msg={msg} loggedInUser={loggedInUser} />)}
            <div ref={msgsEndRef}></div>
        </div>
    )
}
