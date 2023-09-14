import React, { useState } from 'react'
import { ImgUpload } from './ImgUpload'
import groupImg from '../assets/img/user-group-solid.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

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
            {/* <button onClick={() => setGroupCreation(false)}>Back</button> */}
            <FontAwesomeIcon icon={faArrowLeft} onClick={() => setGroupCreation(false)} className="back-arrow"/>
            <form className="flex column align-center justify-center" onSubmit={(ev) => {
                ev.preventDefault()
                console.log(groupDetails);
                onCreateChat(groupDetails)
            }}>
                <ImgUpload defaultImgUrl={groupImg} imgUrl="" alt="group image" onUploadImg={onUploadImg} customStyle="group"/>
                <input type="text" name="title" placeholder="*Group title" required value={groupDetails.title} onChange={handleChange} />
                <input type="text" name="description" placeholder="Group description" value={groupDetails.description} onChange={handleChange} />
                <button disabled={groupDetails.title.length ? false : true}><FontAwesomeIcon icon={faCircleCheck} size="2xl" className="check-icon" /></button>
            </form>
        </div>
    )
}
