import React from 'react'

export function SearchResultsPreview({ res }) {
    return (
        <div>{res.firstName} {res.lastName}</div>
    )
}
