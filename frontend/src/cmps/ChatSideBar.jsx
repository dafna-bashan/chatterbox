import React, { useEffect, useState } from 'react'
import { ChatList } from './ChatList'
// import { SearchBar } from './SearchBar'
// import { SearchResultsList } from './SearchResultsList'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faUserGroup, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'
// import { GroupMembersList } from './GroupMembersList'
// import { GroupAdd } from './GroupAdd'
import { ChatAdd } from './ChatAdd'


export function ChatSideBar({ currChatId, chats, users, loggedInUser, onAddChat, onLoadChat }) {

    const [isSearching, setIsSearching] = useState(false)

    function onToggleSearch(isSearching) {
        setIsSearching(isSearching)
    }
    return (
        <div className="chat-side-bar">
            <ChatAdd users={users} onAddChat={onAddChat} onToggleSearch={onToggleSearch} isSearching={isSearching}/>
           {!isSearching && <ChatList currChatId={currChatId} chats={chats} loggedInUser={loggedInUser} onLoadChat={onLoadChat} />}

            {/* {!isCreatingGroup ? <React.Fragment>
                <div className="flex align-center">
                    <SearchBar toggleSearch={toggleSearch} isSearching={isSearching} isGroupMode={isGroupMode} />
                    <FontAwesomeIcon icon={faUserGroup} onClick={() => toggleSearch(true)} />
                </div>
                {isGroupMode && group.members.length ? <GroupMembersList groupMembers={group.members} onRemoveMember={onRemoveMember} /> : null}
                {isSearching ? <SearchResultsList results={users} onAddChat={onAddChat} toggleSearch={toggleSearch} isGroupMode={isGroupMode} onAddMember={onAddMember} /> :
                    <ChatList currChatId={currChatId} chats={chats} loggedInUser={loggedInUser} onLoadChat={onLoadChat} />}
                <div className="bottom flex align-center justify-center">
                    {isGroupMode && group.members.length ? <FontAwesomeIcon className="group-arrow" icon={faCircleArrowRight} size="2xl" onClick={() => changeGroupCreation(true)} /> : null}
                </div>
            </React.Fragment> :
                <GroupAdd changeGroupCreation={changeGroupCreation} onAddGroup={onAddGroup} />} */}

        </div>
    )
}

