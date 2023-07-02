import React from 'react'

export function SearchBar({ toggleSearch, isSearching }) {

    return (
        <div className={isSearching? "search-bar active" : "search-bar"}>
            <input type="text" placeholder="Search for a user or a chat" onClick={toggleSearch} />
        </div>
    )
}
