import React, { useState } from 'react'
import { ImgUpload } from './ImgUpload'
import groupImg from '../assets/img/noun-user-group-01.png'

export function GroupAdd({ setGroupCreation, onCreateChat }) {

    const [groupDetails, setGroupDetails] = useState({
        title: '',
        description: '',
        imgUrl: groupImg
    })

    const handleChange = ({ target }) => {
        const { name, value } = target
        setGroupDetails({ ...groupDetails, [name]: value })
    }

    function onUploadImg(imgUrl) {
        setGroupDetails({ ...groupDetails, imgUrl })
    }

    return (
        <div>
            <button onClick={() => setGroupCreation(false)}>Back</button>
            <form onSubmit={(ev) => {
                ev.preventDefault()
                console.log(groupDetails);
                onCreateChat(groupDetails)
            }}>
                <ImgUpload defaultImgUrl={groupImg} alt="group image" onUploadImg={onUploadImg} />
                <input type="text" name="title" placeholder="Group title" value={groupDetails.title} onChange={handleChange} />
                <input type="text" name="description" placeholder="Group description" value={groupDetails.description} onChange={handleChange} />
                <button>ADD GROUP</button>
            </form>
        </div>
    )
}
