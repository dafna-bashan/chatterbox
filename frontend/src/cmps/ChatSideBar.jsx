import React, { useState } from 'react'
import { ChatList } from './ChatList'
import { SearchBar } from './SearchBar'
import { SearchResultsList } from './SearchResultsList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'

export function ChatSideBar({ currChatId, chats, users, loggedInUser, onAddChat, onLoadChat }) {

    const [isSearching, setIsSearching] = useState(false)
    const [isGroup, setIsGroup] = useState(false)

    function toggleSearch(isGroup) {
        if (isSearching) {
            setIsSearching(false)
            setIsGroup(false)
        } else {
            setIsSearching(true)
            setIsGroup(isGroup)
        }
    }


    return (
        <div className="chat-side-bar">
            <div className="flex align-center">
                <SearchBar toggleSearch={toggleSearch} isSearching={isSearching} isGroup={isGroup} />
                <FontAwesomeIcon icon={faUserGroup} onClick={() => toggleSearch(true)} />
            </div>
            {isGroup && <div>Group members</div>}
            {isSearching ? <SearchResultsList results={users} onAddChat={onAddChat} toggleSearch={toggleSearch} /> :
                <ChatList currChatId={currChatId} chats={chats} loggedInUser={loggedInUser} onLoadChat={onLoadChat} />}
        </div>
    )
}
