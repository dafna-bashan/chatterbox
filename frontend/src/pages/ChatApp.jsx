import React, { useEffect, useState } from 'react'
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_CHAT_ID, SOCKET_EMIT_START_NEW_CHAT, SOCKET_EVENT_ADDED_TO_CHAT } from '../services/socket.service'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ChatSideBar } from '../cmps/ChatSideBar'
import { MsgList } from '../cmps/MsgList'
import { AddMsg } from '../cmps/AddMsg'
import { addChat, loadChat, loadChats, updateChat } from '../store/actions/chatActions'
import { utilService } from '../services/utilService'
import { loadUser, loadUsers, updateUser } from '../store/actions/userActions'

export function ChatApp() {

    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    const currChat = useSelector(state => state.chatModule.currChat)
    const chats = useSelector(state => state.chatModule.chats)
    const users = useSelector(state => state.userModule.users)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [msg, setMsg] = useState({ txt: '' })
    const [currChatMembers, setCurrChatMembers] = useState([])

    useEffect(() => {
        if (!loggedInUser) navigate('/login')
        else {
            dispatch(loadChats(loggedInUser._id))
            dispatch(loadUsers())
        }
    }, [dispatch, navigate, loggedInUser])

    useEffect(() => {
        // if (!loggedInUser) navigate('/login')
        // if (currChat) onUpdateChatMembers()
        socketService.login(loggedInUser._id)
        socketService.on(SOCKET_EVENT_ADD_MSG, onLoadChats)
        socketService.on(SOCKET_EVENT_ADDED_TO_CHAT, onLoadChats)
        // console.log(loggedInUser.chatsId);
        if (loggedInUser?.chatsId) {
            console.log('emit chat id');
            socketService.emit(SOCKET_EMIT_SET_CHAT_ID, loggedInUser.chatsId)
        }
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, onLoadChats)

        }
    }, [])

    function onLoadChats(chatId) {
        // console.log(`onLoadChats: chatid ${chatId} 'currchatid' ${currChat._id}`);
        if (currChat?._id === chatId) {
            console.log('load curr chat');
            dispatch(loadChat(chatId))
        }
        dispatch(loadChats(loggedInUser._id))
    }

    useEffect(() => {
        console.log('curr chat', currChat?._id);
    }, [currChat?._id])


    function handleChange(ev) {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
    }

    function sendMsg(ev) {
        ev.preventDefault()
        const otherMember = currChat.members.filter(member => member._id !== loggedInUser._id)
        // console.log('curr chat', currChat, loggedInUser, otherMember[0]._id);
        if (!currChat.msgs.length) socketService.emit(SOCKET_EMIT_START_NEW_CHAT, { chatId: currChat._id, toUserId: otherMember[0]._id })
        socketService.emit(SOCKET_EMIT_SEND_MSG, { chatId: currChat._id, msg: msg.txt })
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
    //     console.log('users', users);
    // }, [users])

    function onAddChat(selectedUser) {
        console.log('add chat');
        // const miniLoggedInUser = {
        //     _id: loggedInUser._id,
        //     firstName: loggedInUser.firstName,
        //     lastName: loggedInUser.lastName
        // }
        const members = [selectedUser, loggedInUser]
        setCurrChatMembers([selectedUser, loggedInUser])
        dispatch(addChat({ members }))
        dispatch(loadChats(loggedInUser._id))
    }

    function onUpdateChatMembers() {
        currChatMembers.forEach(member => {
            console.log(member);
            if (member.chatsId) {
                if (!member.chatsId.includes(currChat._id)) member.chatsId.push(currChat._id)
            } else member.chatsId = [currChat._id]
            const isLoggedIn = member._id === loggedInUser._id
            console.log('isLoggedIn', isLoggedIn);
            dispatch(updateUser(member, isLoggedIn))
        })
    }

    useEffect(() => {
        onUpdateChatMembers()
        dispatch(loadUsers())
    }, [chats?.length])

    function onLoadChat(chatId) {
        dispatch(loadChat(chatId))
    }

    if (!loggedInUser) return <div></div>
    return (
        <div className="chat-app flex">
            <React.Fragment>
                <ChatSideBar chats={chats} users={users} loggedInUser={loggedInUser} onAddChat={onAddChat} onLoadChat={onLoadChat} />
                <div className="chat-container flex column full">
                    {currChat?.msgs.length ? <MsgList msgs={currChat.msgs} /> : null}
                    {currChat?._id && <AddMsg msg={msg} handleChange={handleChange} sendMsg={sendMsg} />}
                    {!currChat?._id && <div className="welcome">Chatterbox</div>}
                </div>
            </React.Fragment>
        </div>
    )
}
