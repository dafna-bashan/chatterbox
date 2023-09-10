import React from 'react'
import { SearchResultsPreview } from './SearchResultsPreview'

export function SearchResultsList({ results, setSearchMode, onSelectUser, isGroupMode }) {
    return (
        <div className="search-results-list">
            {results.map((res, idx) => <SearchResultsPreview key={idx} res={res} setSearchMode={setSearchMode} onSelectUser={onSelectUser} isGroupMode={isGroupMode} />
            )}
        </div>
    )
}
