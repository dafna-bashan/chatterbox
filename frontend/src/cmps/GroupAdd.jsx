import React, { useState } from 'react'
import { ImgUpload } from './ImgUpload'

export function GroupAdd({ setGroupCreation, onCreateChat }) {

    const [groupDetails, setGroupDetails] = useState({
        title: '',
        description: '',
        imgUrl: ''
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
                onCreateChat(groupDetails)
            }}>
                <ImgUpload defaultImgUrl="https://img.favpng.com/25/7/19/users-group-computer-icons-png-favpng-WKWD9rqs5kwcviNe9am7xgiPx.jpg" alt="group image" onUploadImg={onUploadImg} />
                <input type="text" name="title" placeholder="Group title" value={groupDetails.title} onChange={handleChange} />
                <input type="text" name="description" placeholder="Group description" value={groupDetails.description} onChange={handleChange} />
                <button>ADD GROUP</button>
            </form>
        </div>
    )
}
