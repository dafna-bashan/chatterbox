import React from 'react'
import { SearchResultsPreview } from './SearchResultsPreview'

export function SearchResultsList({ results, onAddChat, toggleSearch }) {
    return (
        <div className="search-results-list">
            {results.map((res, idx) => <SearchResultsPreview key={idx} res={res} onAddChat={onAddChat} toggleSearch={toggleSearch}/>)}
        </div>
    )
}
