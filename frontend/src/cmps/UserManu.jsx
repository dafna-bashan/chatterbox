import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../store/actions/authActions'
import { Link } from 'react-router-dom'

export function UserManu({ closeFunc, isChatOpen }) {

    const dispatch = useDispatch()

    const onLogout = () => {
        console.log('logout')
        dispatch(logout())
    }


    return (
        <div className={`user-manu ${isChatOpen ? 'chat-view' : ''}`} onClick={closeFunc}>
            <Link to="/user"><div>My Profile</div></Link>
            <Link to="/chat"><div>Group Chat</div></Link>
            <div></div>
            <div onClick={onLogout}>Logout</div>
        </div>
    )
}
