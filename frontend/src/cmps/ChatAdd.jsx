import React, { useEffect, useState } from 'react'
import { SearchBar } from './SearchBar'
import { SearchResultsList } from './SearchResultsList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup, faCircleArrowRight, faMessage } from '@fortawesome/free-solid-svg-icons'
import { GroupMembersList } from './GroupMembersList'
import { GroupAdd } from './GroupAdd'

export function ChatAdd({ users, onAddChat, onSetSearch, isSearching, loggedInUser }) {

    const [isGroupMode, setIsGroupMode] = useState(false)
    const [isCreatingGroup, setIsCreatingGroup] = useState(false)
    const [groupMembers, setGroupMembers] = useState([])

    function setSearchMode(isGroupMode) {
        if (isSearching) {
            onSetSearch(false)
            setIsGroupMode(false)
            setGroupMembers([])
        } else {
            onSetSearch(true)
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
            setSearchMode(false)
            // setIsGroupMode(false)
            setGroupCreation(false)
            // setGroupMembers([])
        }
        onAddChat(newChat)
    }

    function filterUsers() {
        return users.filter(user => user._id !== loggedInUser._id)
    }

    return (
        <div className={isSearching ? "chat-add flex column full-height" : "chat-add flex column"} >
            {!isCreatingGroup ? <React.Fragment>
                <div className="flex align-center">
                    <SearchBar setSearchMode={setSearchMode} isSearching={isSearching} isGroupMode={isGroupMode} />
                    {!isSearching && <FontAwesomeIcon icon={faUserGroup} onClick={() => setSearchMode(true)} title="New group" style={{ color: "#3d434c" }} />}
                </div>
                {isGroupMode && groupMembers.length ? <GroupMembersList groupMembers={groupMembers} onRemoveMember={onRemoveMember} /> : null}
                {isSearching ? <SearchResultsList results={filterUsers()} loggedInUser={loggedInUser} setSearchMode={setSearchMode} onSelectUser={onSelectUser} isGroupMode={isGroupMode} /> : null}
                {isGroupMode && groupMembers.length ? <div className="bottom flex align-center justify-center">
                    <FontAwesomeIcon className="groupMembers-arrow" icon={faCircleArrowRight} size="2xl" onClick={() => setGroupCreation(true)} />
                </div> : null}
            </React.Fragment> :
                <GroupAdd setGroupCreation={setGroupCreation} onCreateChat={onCreateChat} />}
        </div>
    )
}
