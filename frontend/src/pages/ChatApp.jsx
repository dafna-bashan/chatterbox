import React, { useEffect, useState } from 'react'
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG } from '../services/socket.service'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ChatSideBar } from '../cmps/ChatSideBar'
import { MsgList } from '../cmps/MsgList'
import { AddMsg } from '../cmps/AddMsg'
import { addChat, loadChat, loadChats, updateChat } from '../store/actions/chatActions'
import { utilService } from '../services/utilService'

export function ChatApp() {

    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    const currChat = useSelector(state => state.chatModule.currChat)
    // const chats = useSelector(state => state.chatModule.chats)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [msg, setMsg] = useState({ txt: '' })
    // const [msgs, setMsgs] = useState(currChat.msgs)

    useEffect(() => {
        dispatch(loadChats())
        loadDefaultChat()
    }, [dispatch])

    // useEffect(() => {
    //     if (currChat.msgs.length) setMsgs(currChat.msgs)
    // }, [currChat])

    function loadDefaultChat(){
        dispatch(loadChat('64521771d24e76ba01009bc3'))
    }


    useEffect(() => {
        if (!loggedInUser) navigate('/login')
        socketService.on(SOCKET_EVENT_ADD_MSG, loadDefaultChat)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, loadDefaultChat)

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

    function addMsg(msg) {
        // setMsgs(prevMsgs => [...prevMsgs, newMsg])
        const updatedChat = { ...currChat }
        const newMsg = {
            ...msg,
            _id: utilService.makeId(),
            from: {
                _id: loggedInUser._id,
                firstName: loggedInUser.firstName,
                lastName: loggedInUser.lastName,
            },
            sent: Date.now()
        }
        updatedChat.msgs.push(newMsg)
        // console.log(updatedChat);
        dispatch(updateChat(updatedChat))
    }

    // useEffect(() => {
    //     if (msgs.length) {
    //         const updatedChat = { ...currChat, msgs }
    //         dispatch(updateChat(updatedChat))
    //     }
    // }, [msgs, dispatch])


    return (
        <div className="chat-app flex">
            {/* <ChatSideBar /> */}
            <div className="chat-container flex column full">
                {currChat.msgs.length && <MsgList msgs={currChat.msgs} />}
                <AddMsg msg={msg} handleChange={handleChange} sendMsg={sendMsg} />
            </div>
        </div>
    )
}
