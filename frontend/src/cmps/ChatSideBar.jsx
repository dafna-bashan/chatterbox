import React, { useEffect, useState } from 'react'
import { ChatList } from './ChatList'
import { SearchBar } from './SearchBar'
import { SearchResultsList } from './SearchResultsList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'
import { GroupMembersList } from './GroupMembersList'


export function ChatSideBar({ currChatId, chats, users, loggedInUser, onAddChat, onLoadChat }) {

    const [isSearching, setIsSearching] = useState(false)
    const [isGroup, setIsGroup] = useState(false)
    const [groupMembers, setGroupMembers] = useState([])

    function toggleSearch(isGroup) {
        if (isSearching) {
            setIsSearching(false)
            setIsGroup(false)
            setGroupMembers([])
        } else {
            setIsSearching(true)
            setIsGroup(isGroup)
        }
    }

    useEffect(() => {
        console.log(groupMembers);
    }, [groupMembers])


    function onAddMember(newMember) {
        var isInGroup = false
        groupMembers.forEach(member => {
            if (member._id === newMember._id) {
                isInGroup = true
                return
            }
        })
        if (!isInGroup) setGroupMembers([...groupMembers, newMember])
    }

    function onRemoveMember(memberId) {
        const updatedGroupMembers = groupMembers.filter(member => member._id !== memberId)
        setGroupMembers(updatedGroupMembers)
    }

    return (
        <div className="chat-side-bar">
            <div className="flex align-center">
                <SearchBar toggleSearch={toggleSearch} isSearching={isSearching} isGroup={isGroup} />
                <FontAwesomeIcon icon={faUserGroup} onClick={() => toggleSearch(true)} />
            </div>
            {isGroup && groupMembers.length ? <GroupMembersList groupMembers={groupMembers} onRemoveMember={onRemoveMember} /> : null}
            {isSearching ? <SearchResultsList results={users} onAddChat={onAddChat} toggleSearch={toggleSearch} isGroup={isGroup} onAddMember={onAddMember} /> :
                <ChatList currChatId={currChatId} chats={chats} loggedInUser={loggedInUser} onLoadChat={onLoadChat} />}
            <FontAwesomeIcon icon={faCircleArrowRight} size="2xl" />
        </div>
    )
}
