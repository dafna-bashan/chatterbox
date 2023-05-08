import React from 'react'
import { SearchResultsPreview } from './SearchResultsPreview'

export function SearchResultsList({ results, onAddChat }) {
    return (
        <div className="search-results-list">
            {results.map((res, idx) => <SearchResultsPreview key={idx} res={res} onAddChat={onAddChat} />)}
        </div>
    )
}
