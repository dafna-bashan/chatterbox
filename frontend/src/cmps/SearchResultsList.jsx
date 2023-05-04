import React from 'react'
import { SearchResultsPreview } from './SearchResultsPreview'

export function SearchResultsList({ results }) {
    return (
        <div className="search-results-list">
            {results.map(res => <SearchResultsPreview res={res} />)}
        </div>
    )
}
