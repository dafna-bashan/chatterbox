import React, { useEffect, useState } from 'react'
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { useDispatch, useSelector } from 'react-redux'
import userImg from '../assets/img/user-img.png'
import { UserManu } from './UserManu'
import { ChatHeader } from './ChatHeader';
import { logout } from '../store/actions/authActions';
import { redirect, useNavigate } from 'react-router-dom';

export function NavBar() {

  const [isManuOpen, setIsManuOpen] = useState(false)
  const loggedInUser = useSelector(state => state.userModule.loggedInUser)
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
    <div className="flex align-center">
      <div className={`nav-bar flex space-between ${isChatOpen ? 'chat-view' : ''} `}>
        <div>Chatterbox</div>
        {loggedInUser && <div>
          <ClickAwayListener onClickAway={() => setIsManuOpen(false)}>
            <div className="user" onClick={toggleManu}>
              <span className="username">{loggedInUser.firstName}</span>
              <img src={loggedInUser.imgUrl ? loggedInUser.imgUrl : userImg} alt="" />
              {isManuOpen && <UserManu closeFunc={() => setIsManuOpen(false)} isChatOpen={isChatOpen} onLogout={onLogout} />}
            </div>
          </ClickAwayListener>
        </div>}
      </div>
      {isChatOpen && loggedInUser && <ChatHeader />}
    </div>
  )
}
