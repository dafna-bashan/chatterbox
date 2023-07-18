import React, { useEffect, useState } from 'react'
import { SearchBar } from './SearchBar'
import { SearchResultsList } from './SearchResultsList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'
import { GroupMembersList } from './GroupMembersList'
import { GroupAdd } from './GroupAdd'


export function ChatAdd({ users, onAddChat, onToggleSearch, isSearching }) {

    const [isGroupMode, setIsGroupMode] = useState(false)
    const [isCreatingGroup, setIsCreatingGroup] = useState(false)
    const [groupMembers, setGroupMembers] = useState([])

    function setSearchMode(isGroupMode) {
        if (isSearching) {
            onToggleSearch(false)
            setIsGroupMode(false)
            setGroupMembers([])
        } else {
            onToggleSearch(true)
            setIsGroupMode(isGroupMode)
        }
    }

    useEffect(() => {
        console.log(groupMembers);
    }, [groupMembers])

    function onSelectUser(user) {
        if (isGroupMode) {
            onAddMember(user)
        } else {
            onCreateChat({ members: [user] })
        }
    }

    function onAddMember(newMember) {
        console.log('on add member', newMember);
        var isInGroup = false
        if (groupMembers.length) {
            groupMembers.forEach(member => {
                if (member._id === newMember._id) {
                    isInGroup = true
                    return
                }
            })
        }
        if (isInGroup) return
        console.log('not in group');
        setGroupMembers([...groupMembers, newMember])
    }

    function onRemoveMember(memberId) {
        const updatedGroupMembers = groupMembers.filter(member => member._id !== memberId)
        setGroupMembers(updatedGroupMembers)
    }

    function setGroupCreation(isCreating) {
        setIsCreatingGroup(isCreating)
    }

    function onCreateChat(chatData) {
        // console.log('on create chat', chatData);
        const newChat = {
            title: chatData.title || null,
            description: chatData.description || null,
            imgUrl: chatData.imgUrl || null,
            members: isGroupMode ? groupMembers : chatData.members,
        }
        if (isGroupMode) {
            setIsGroupMode(false)
            setGroupCreation(false)
            setGroupMembers([])
        }
        onAddChat(newChat)
    }


    return (
        <div>
            {!isCreatingGroup ? <React.Fragment>
                <div className="flex align-center">
                    <SearchBar setSearchMode={setSearchMode} isSearching={isSearching} isGroupMode={isGroupMode} />
                    <FontAwesomeIcon icon={faUserGroup} onClick={() => setSearchMode(true)} />
                </div>
                {isGroupMode && groupMembers.length ? <GroupMembersList groupMembers={groupMembers} onRemoveMember={onRemoveMember} /> : null}
                {isSearching ? <SearchResultsList results={users} setSearchMode={setSearchMode} onSelectUser={onSelectUser} isGroupMode={isGroupMode} /> : null}
                <div className="bottom flex align-center justify-center">
                    {isGroupMode && groupMembers.length ? <FontAwesomeIcon className="groupMembers-arrow" icon={faCircleArrowRight} size="2xl" onClick={() => setGroupCreation(true)} /> : null}
                </div>
            </React.Fragment> :
                <GroupAdd setGroupCreation={setGroupCreation} onCreateChat={onCreateChat} />}
        </div>
    )
}