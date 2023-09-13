import React, { useState } from 'react'
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { useDispatch, useSelector } from 'react-redux'
import userImg from '../assets/img/noun-user-1.png'
import { UserManu } from './UserManu'
import { ChatHeader } from './ChatHeader';
import { logout } from '../store/actions/authActions';

export function NavBar() {

  const [isManuOpen, setIsManuOpen] = useState(false)
  const loggedInUser = useSelector(state => state.userModule.loggedInUser)
  const currChat = useSelector(state => state.chatModule.currChat)
  const dispatch = useDispatch()

  const toggleManu = () => {
    if (isManuOpen) setIsManuOpen(false)
    else setIsManuOpen(true)
  }

  const onLogout = () => {
    console.log('logout')
    dispatch(logout())

  }

  const isChatOpen = window.location.href.endsWith('chat')

  return (
    <div className="nav-bar flex align-center">
      <div className={`flex align-center space-between ${isChatOpen ? 'chat-view' : 'profile-view'} `}>
        {!isChatOpen && <div>Chatterbox</div>}
        {loggedInUser && <div>
          <ClickAwayListener onClickAway={() => setIsManuOpen(false)}>
            <div className="user" onClick={toggleManu}>
              <img src={loggedInUser.imgUrl ? loggedInUser.imgUrl : userImg} alt="" />
              <span className="username">{loggedInUser.firstName}</span>
              {isManuOpen && <UserManu closeFunc={() => setIsManuOpen(false)} isChatOpen={isChatOpen} onLogout={onLogout} />}
            </div>
          </ClickAwayListener>
        </div>}
      </div>
      {currChat && <ChatHeader />}
    </div>
  )
}
