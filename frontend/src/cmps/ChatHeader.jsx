import React from 'react'
import { useSelector } from 'react-redux'
import userImg from '../assets/img/noun-user-1.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'

export function ChatHeader() {

    const currChat = useSelector(state => state.chatModule.currChat)
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    // console.log(currChat.title, isGroupChat, otherMembers);    

    const isGroupChat = currChat.members.length > 2
    const otherMembers = currChat.members.filter(member => member._id !== loggedInUser._id)

    return (
        <div className="chat-header full flex align-center">
            {isGroupChat ?
                <div className='flex align-center'>
                    {currChat.imgUrl ? <img src={currChat.imgUrl} alt={otherMembers[0]?.firstName} /> : <div className="group-icon flex align-center justify-center"><FontAwesomeIcon icon={faUserGroup} /></div>}
                    <div>
                        <div>{currChat?.title}</div>
                        <div className="members">
                            {otherMembers.map(member => <span key={member._id}>{member.firstName}, </span>)}
                            <span>you</span>
                        </div>
                    </div>
                </div> :
                <div className='flex align-center'>
                    <img src={otherMembers[0]?.imgUrl || userImg} alt={otherMembers[0]?.firstName} />
                    <div>{otherMembers[0]?.firstName} {otherMembers[0]?.lastName}</div>
                </div>
            }
        </div>
    )
}
