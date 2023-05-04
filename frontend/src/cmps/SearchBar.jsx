import React from 'react'

export function SearchBar({ toggleSearch }) {

    return (
        <div>
            <input type="text" placeholder="Search for a user or a chat" onClick={toggleSearch} />
        </div>
    )
}
