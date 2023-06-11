import React from 'react'

export function SearchResultsPreview({ res, onAddChat, toggleSearch }) {

    // const miniUser = {
    //     _id: res._id,
    //     firstName: res.firstName,
    //     lastName: res.lastName
    // }

    return (
        <div onClick={() => {
            onAddChat(res)
            toggleSearch()
        }
        }>{res.firstName} {res.lastName}</div>
    )
}
