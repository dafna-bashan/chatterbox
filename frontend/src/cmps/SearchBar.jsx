import React from 'react'

export function SearchBar({ setSearchMode, isSearching, isGroupMode }) {

    return (
        <div className={isSearching ? "search-bar full active" : "search-bar full"}>
            <input type="text" placeholder={isGroupMode ? "Add members to your group" : "Search for a user or a chat"} onClick={() => setSearchMode(false)} />
        </div>
    )
}
