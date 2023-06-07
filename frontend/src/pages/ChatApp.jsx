import React, { useEffect, useState } from 'react'
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_CHAT_ID } from '../services/socket.service'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ChatSideBar } from '../cmps/ChatSideBar'
import { MsgList } from '../cmps/MsgList'
import { AddMsg } from '../cmps/AddMsg'
import { addChat, loadChat, loadChats, updateChat } from '../store/actions/chatActions'
import { utilService } from '../services/utilService'
import { loadUsers } from '../store/actions/userActions'

export function ChatApp() {

    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    const currChat = useSelector(state => state.chatModule.currChat)
    const chats = useSelector(state => state.chatModule.chats)
    const users = useSelector(state => state.userModule.users)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [msg, setMsg] = useState({ txt: '' })

    useEffect(() => {
        if (!loggedInUser) navigate('/login')
        else {
            dispatch(loadChats(loggedInUser._id))
            dispatch(loadUsers())
        }
    }, [dispatch, navigate, loggedInUser])

    useEffect(() => {
        // if (!loggedInUser) navigate('/login')
        socketService.on(SOCKET_EVENT_ADD_MSG, onLoadChats)
        socketService.emit(SOCKET_EMIT_SET_CHAT_ID, currChat?._id)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, onLoadChats)

        }
    }, [currChat?._id])

    function onLoadChats(chatId) {
        dispatch(loadChat(chatId))
        dispatch(loadChats(loggedInUser._id))
    }

    function handleChange(ev) {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
    }

    function sendMsg(ev) {
        ev.preventDefault()
        socketService.emit(SOCKET_EMIT_SEND_MSG, currChat._id)
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


    function onAddChat(selectedUser) {
        console.log('add chat');
        const miniLoggedInUser = {
            _id: loggedInUser._id,
            firstName: loggedInUser.firstName,
            lastName: loggedInUser.lastName
        }
        const members = [selectedUser, miniLoggedInUser]
        dispatch(addChat({ members }))
    }

    function onLoadChat(chatId) {
        dispatch(loadChat(chatId))
    }

    if (!loggedInUser) return <div></div>
    return (
        <div className="chat-app flex">
            <React.Fragment>
                <ChatSideBar chats={chats} users={users} loggedInUser={loggedInUser} onAddChat={onAddChat} onLoadChat={onLoadChat} />
                <div className="chat-container flex column full">
                    {currChat?.msgs.length ?
                        <React.Fragment>
                            <MsgList msgs={currChat.msgs} />
                            <AddMsg msg={msg} handleChange={handleChange} sendMsg={sendMsg} />
                        </React.Fragment> : <div className="welcome">Chatterbox</div>
                    }
                </div>
            </React.Fragment>
        </div>
    )
}
