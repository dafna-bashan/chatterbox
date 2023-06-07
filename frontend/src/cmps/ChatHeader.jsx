import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export function ChatHeader() {

    const currChat = useSelector(state => state.chatModule.currChat)
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    const isGroupChat = currChat.members.length > 2
    const otherMembers = currChat.members.filter(member => member._id !== loggedInUser._id)
    // console.log(currChat.title, isGroupChat, otherMembers);
    const navigate = useNavigate()

    useEffect(() => {
        if (!loggedInUser) navigate('/login')
    }, [])

    return (
        <div className="chat-header full">
            {isGroupChat &&
                <div>
                    <div>
                        {currChat.title}
                    </div>
                    <div>{otherMembers.map(member => <span>{member.firstName}, </span>)}
                        <span>you</span>
                    </div>
                </div>}
            {!isGroupChat && <div>{otherMembers[0]?.firstName} {otherMembers[0]?.lastName}</div>
            }
        </div>
    )
}
