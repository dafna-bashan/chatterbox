import React, { useEffect, useState } from 'react'
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG } from '../services/socket.service'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ChatSideBar } from '../cmps/ChatSideBar'
import { MsgList } from '../cmps/MsgList'
import { AddMsg } from '../cmps/AddMsg'

export function ChatApp() {

    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    const navigate = useNavigate()

    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])

    useEffect(() => {
        if (!loggedInUser) navigate('/login')
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)

        }
    }, [loggedInUser, navigate])

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
        <div className="chat-app flex">
            <ChatSideBar />
            <div className="chat-container flex column full">
                <MsgList msgs={msgs} />
                <AddMsg msg={msg} handleChange={handleChange} sendMsg={sendMsg}/>
            </div>
        </div>
    )
}
