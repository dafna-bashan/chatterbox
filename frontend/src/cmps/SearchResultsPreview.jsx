import React from 'react'
import userImg from '../assets/img/user-img.png'

export function SearchResultsPreview({ res, setSearchMode, onSelectUser, isGroupMode }) {

    return (
        <div className="search-results-preview flex align-center" onClick={() => {
            onSelectUser(res)
            if (!isGroupMode) setSearchMode(false)
        }
        }>
            <img src={res.imgUrl || userImg} alt={res.firstName} />
            <div>{res.firstName} {res.lastName}</div>

        </div>
    )
}
