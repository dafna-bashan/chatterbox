import React, { useState } from 'react'
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { useSelector } from 'react-redux'
import userImg from '../assets/img/user-img.png'
import { UserManu } from './UserManu'
import { ChatHeader } from './ChatHeader';

export function NavBar({ onLogout }) {

  const [isManuOpen, setIsManuOpen] = useState(false)
  const loggedInUser = useSelector(state => state.userModule.loggedInUser)

  const toggleManu = () => {
    if (isManuOpen) setIsManuOpen(false)
    else setIsManuOpen(true)
  }

  const isChatOpen = window.location.href.endsWith('chat')

  return (
    <div className="flex align-center">
      <div className={`nav-bar flex space-between ${isChatOpen ? 'chat-view' : ''} `}>
        <div>Chatterbox</div>
        {loggedInUser && <div>
          <ClickAwayListener onClickAway={() => setIsManuOpen(false)}>
            <div className="user" onClick={toggleManu}><img src={loggedInUser.imgUrl ? loggedInUser.imgUrl : userImg} alt="" />
              {/* <span className="username">{loggedInUser.firstName} {loggedInUser.lastName}</span> */}
              {isManuOpen && <UserManu closeFunc={() => setIsManuOpen(false)} isChatOpen={isChatOpen} />}
            </div>
          </ClickAwayListener>
        </div>}
      </div>
      {isChatOpen && <ChatHeader />}
    </div>
  )
}
