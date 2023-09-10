import React, { useState } from 'react'
import { ImgUpload } from './ImgUpload'
import groupImg from '../assets/img/noun-user-group-01.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

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
        <div className="group-add">
            <button onClick={() => setGroupCreation(false)}>Back</button>
            <form className="flex column" onSubmit={(ev) => {
                ev.preventDefault()
                console.log(groupDetails);
                onCreateChat(groupDetails)
            }}>
                <ImgUpload defaultImgUrl={groupImg} imgUrl="" alt="group image" onUploadImg={onUploadImg} />
                <input type="text" name="title" placeholder="*Group title" required value={groupDetails.title} onChange={handleChange} />
                <input type="text" name="description" placeholder="Group description" value={groupDetails.description} onChange={handleChange} />
                <button disabled={groupDetails.title.length ? false : true}><FontAwesomeIcon icon={faCircleCheck} size="2xl" className="check-icon" /></button>
            </form>
        </div>
    )
}
