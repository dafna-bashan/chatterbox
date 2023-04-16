import React, { useEffect, useState } from 'react'
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG } from '../services/socket.service'

export const ChatApp = () => {

    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
         
        }
    }, [])

    function handleChange(ev) {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
    }

    function sendMsg(ev) {
        ev.preventDefault()
        socketService.emit(SOCKET_EMIT_SEND_MSG, msg)
        // for now - we add the msg ourself
        addMsg(msg)
        setMsg({ txt: '' })
    }

    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    return (
        <div>
            <ul>
                {msgs.map((msg, idx) => <li key={idx}>{msg.txt}</li>)}
            </ul>
            <form onSubmit={sendMsg}>
                <input type="text" name="txt" placeholder="enter a message" value={msg.txt} onChange={handleChange} />
                <button>Send</button>
            </form>
        </div>
    )
}
