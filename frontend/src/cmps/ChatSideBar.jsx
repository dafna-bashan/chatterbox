import React, { useState } from 'react'
import { ChatList } from './ChatList'
import { SearchBar } from './SearchBar'
import { SearchResultsList } from './SearchResultsList'

export function ChatSideBar({currChatId, chats, users, loggedInUser, onAddChat, onLoadChat }) {

    const [isSearching, setIsSearching] = useState(false)

    function toggleSearch() {
        console.log('toggle search', isSearching);
        if (isSearching) setIsSearching(false)
        else setIsSearching(true)
        console.log('search', isSearching);
    }


    return (
        <div className="chat-side-bar">
            <SearchBar toggleSearch={toggleSearch} />
            {isSearching && <SearchResultsList results={users} onAddChat={onAddChat} toggleSearch={toggleSearch} />}
            <ChatList currChatId={currChatId} chats={chats} loggedInUser={loggedInUser} onLoadChat={onLoadChat} />
        </div>
    )
}
