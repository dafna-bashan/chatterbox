import React, { useState } from 'react'
import { ChatList } from './ChatList'
import { ChatAdd } from './ChatAdd'


export function ChatSideBar({ currChatId, chats, users, loggedInUser, onAddChat, onLoadChat }) {

    const [isSearching, setIsSearching] = useState(false)

    function onSetSearch(isSearching) {
        setIsSearching(isSearching)
    }
    return (
        <div className="chat-side-bar flex column">
            <ChatAdd users={users} onAddChat={onAddChat} onSetSearch={onSetSearch}
                isSearching={isSearching} loggedInUser={loggedInUser} />
            {!isSearching && <ChatList currChatId={currChatId} chats={chats} loggedInUser={loggedInUser} onLoadChat={onLoadChat} />}
        </div>
    )
}

