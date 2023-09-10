import React from 'react'
import { Chip } from '@mui/material';
import { Avatar } from '@mui/material';

export function GroupMembersList({ groupMembers, onRemoveMember }) {
    return (
        <div className="group-members-list">
            {groupMembers.map(member => <Chip key={member._id} label={`${member.firstName} ${member.lastName}`} 
            variant="outlined" onDelete={() => onRemoveMember(member._id)} avatar={<Avatar src={member.imgUrl} />} />)}
        </div>
    )
}
