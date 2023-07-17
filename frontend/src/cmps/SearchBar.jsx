import React from 'react'

export function SearchBar({ setSearchMode, isSearching, isGroup }) {

    return (
        <div className={isSearching ? "search-bar full active" : "search-bar full"}>
            <input type="text" placeholder={isGroup ? "Add members to your group" : "Search for a user or a chat"} onClick={() => setSearchMode(false)} />
        </div>
    )
}
