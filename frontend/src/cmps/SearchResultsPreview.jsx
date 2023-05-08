import React from 'react'

export function SearchResultsPreview({ res, onAddChat }) {

    const miniUser = {
        _id: res._id,
        firstName: res.firstName,
        lastName: res.lastName
    }

    return (
        <div onClick={() => onAddChat(miniUser)}>{res.firstName} {res.lastName}</div>
    )
}
