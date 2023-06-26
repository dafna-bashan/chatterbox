import React from 'react'
import { Link } from 'react-router-dom'

export function UserManu({ closeFunc, isChatOpen, onLogout }) {


    return (
        <div className={`user-manu ${isChatOpen ? 'chat-view' : ''}`} onClick={closeFunc}>
            <Link to="/chat"><div>Group Chat</div></Link>
            <Link to="/user"><div>My Profile</div></Link>
            <div></div>
            <div onClick={onLogout}>Logout</div>
        </div>
    )
}
