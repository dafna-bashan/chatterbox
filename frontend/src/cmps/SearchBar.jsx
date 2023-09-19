import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export function SearchBar({ setSearchMode, isSearching, isGroupMode }) {

    return (
        <div className={isSearching ? "search-bar flex align-center full active" : "search-bar flex align-center full"}>
            {isSearching && <FontAwesomeIcon icon={faArrowLeft} onClick={() => setSearchMode(false)} className="back-arrow" title="Back to chats" />}
            <input type="text" placeholder={isGroupMode ? "Add members to your group" : "Search for a user or a chat"}
                onClick={() => {
                    if (!isSearching) setSearchMode(false)
                }
                } />
        </div>
    )
}
