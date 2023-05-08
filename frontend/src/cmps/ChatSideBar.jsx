import React, { useState } from 'react'
import { ChatList } from './ChatList'
import { SearchBar } from './SearchBar'
import { SearchResultsList } from './SearchResultsList'

export function ChatSideBar({ chats, users, loggedInUser, onAddChat, onLoadChat }) {

    const [isSearching, setIsSearching] = useState(false)

    function toggleSearch() {
        console.log('toggle search');
        if (isSearching) setIsSearching(false)
        else setIsSearching(true)
    }


    return (
        <div className="chat-side-bar">
            <SearchBar toggleSearch={toggleSearch} />
            {!isSearching && <ChatList chats={chats} loggedInUser={loggedInUser} onLoadChat={onLoadChat}/>}
            {isSearching && <SearchResultsList results={users} onAddChat={onAddChat} />}
        </div>
    )
}
