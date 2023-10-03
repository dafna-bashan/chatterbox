import React, { useEffect, useRef } from 'react'
import { MsgPreview } from './MsgPreview'
import { useTimestamp } from '../hooks/useTimestamp'

export function MsgList({ msgs, loggedInUser, isGroupChat }) {

    const msgsEndRef = useRef(null)

    const scrollToBottom = () => {
        msgsEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        console.log(isGroupChat);
    }, [msgs])


    useEffect(() => {
        scrollToBottom()
    }, [msgs?.length]);

    return (
        <div className="msg-list full">
            {msgs && msgs.map((msg, idx) => < MsgPreview key={idx} msg={msg} prevMsg={msgs[idx - 1] || null} loggedInUser={loggedInUser} isGroupChat={isGroupChat} />)}
            <div ref={msgsEndRef}></div>
        </div>
    )
}
