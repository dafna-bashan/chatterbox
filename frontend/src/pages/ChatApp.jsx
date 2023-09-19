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
        }
    }, [dispatch, navigate, loggedInUser])

    useEffect(() => {
        // if (!loggedInUser) navigate('/login')
        // if (currChat) onUpdateChatMembers()
        dispatch(loadUsers())
        // dispatch(loadUser(loggedInUser._id))
        socketService.login(loggedInUser?._id)
        socketService.on(SOCKET_EVENT_ADD_MSG, (chatId) => {
            console.log('add msg', currChat, chats, loggedInUser._id);
            onLoadChats(chatId)

        })
        socketService.on(SOCKET_EVENT_ADDED_TO_CHAT, (chatId) => {
            socketService.emit(SOCKET_EMIT_SET_CHAT_ID, { chatsId: loggedInUser.chatsId, userId: loggedInUser._id })
            onLoadChats(chatId)
        })
        console.log('loggedInUser.chatsId', loggedInUser?.chatsId);
        if (loggedInUser?.chatsId?.length) {
            console.log('emit chat id');
            socketService.emit(SOCKET_EMIT_SET_CHAT_ID, { chatsId: loggedInUser.chatsId, userId: loggedInUser._id })
        }
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG)
            dispatch({ type: 'SET_CHAT', chat: null })
            // socketService.logout(loggedInUser._id)
        }
    }, [])

    useEffect(() => {
        dispatch(loadChats(loggedInUser._id))
    }, [currChat?.msgs?.length])

    useEffect(() => {
        console.log('curr chat', currChat);
    }, [currChat?._id])

    useEffect(() => {
        onUpdateChatMembers()
        dispatch(loadUsers())
    }, [chats?.length])

    //TODO - BUGG, NOT ALWAYS LOADING, NOT LOADING THE CURR CHAT???
    // the currChat in going to the initial state when recieving the event. WHY???
    // in the redux devtool i can see the updated currChat details but in the logs it is the initial state.

    function onLoadChats(chatId) {
        console.log(`onLoadChats: chatid ${chatId} 'currchatid' ${currChat?._id}`);
        console.log('curr chat onload', currChat);
        console.log(currChat?._id === chatId);

        if (currChat?._id === chatId) {
            console.log('load curr chat');
            dispatch(loadChat(chatId))
        }
        dispatch(loadChats(loggedInUser._id))
    }

    function onLoadChat(chatId) {
        dispatch(loadChat(chatId))
    }

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
                imgUrl: loggedInUser.imgUrl
            },
            sent: Date.now()
        }
        updatedChat.msgs.push(newMsg)
        // console.log(updatedChat);
        dispatch(updateChat(updatedChat))
    }

    // useEffect(() => {
    //     // console.log('users', users);
    //     dispatch(loadUser(loggedInUser._id))
    // }, [users])

    function onAddChat(chatData) {
        let members = [...chatData.members, loggedInUser]
        const newChat = { ...chatData, members }
        setCurrChatMembers(members)
        dispatch(addChat(newChat))
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



    if (!loggedInUser) return <div></div>
    return (
        <div className="chat-app flex">
            <React.Fragment>
                <ChatSideBar currChatId={currChat?._id} chats={chats} users={users} loggedInUser={loggedInUser} onAddChat={onAddChat} onLoadChat={onLoadChat} />
                <div className="chat-container flex column full">
                    <MsgList msgs={currChat?.msgs} loggedInUser={loggedInUser} isGroupChat={currChat?.members.length > 2 ? true : false} />
                    {currChat?._id && <AddMsg msg={msg} handleChange={handleChange} sendMsg={sendMsg} />}
                    {!currChat?._id && <div className="welcome">Chatterbox</div>}
                </div>
            </React.Fragment>
        </div>
    )
}
