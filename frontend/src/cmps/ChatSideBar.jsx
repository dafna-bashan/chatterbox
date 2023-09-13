import React, { useState } from 'react'
import { ChatList } from './ChatList'
import { ChatAdd } from './ChatAdd'


export function ChatSideBar({ currChatId, chats, users, loggedInUser, onAddChat, onLoadChat }) {

    const [isSearching, setIsSearching] = useState(false)

    function onToggleSearch(isSearching) {
        setIsSearching(isSearching)
    }
    return (
        <div className="chat-side-bar flex column">
            <ChatAdd users={users} onAddChat={onAddChat} onToggleSearch={onToggleSearch} isSearching={isSearching} loggedInUser={loggedInUser}/>
           {!isSearching && <ChatList currChatId={currChatId} chats={chats} loggedInUser={loggedInUser} onLoadChat={onLoadChat} />}
        </div>
    )
}

