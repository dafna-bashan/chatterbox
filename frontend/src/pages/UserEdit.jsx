import React, { useEffect, useState } from 'react'
import { cloudinaryService } from '../services/cloudinaryService'
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../cmps/NavBar'
import userImg from '../assets/img/user-img.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../store/actions/userActions'
import { Loader } from '../cmps/Loader'

export function UserEdit() {

    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    const isSuccessful = useSelector(state => state.systemModule.isSuccessful)
    const isLoading = useSelector(state => state.systemModule.isLoading)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [user, setUser] = useState(loggedInUser)


    const [img, setImg] = useState({
        imgUrl: user?.imgUrl,
        height: '40px',
        width: '100%',
        isUploading: false
    })

    const handleChange = ({ target }) => {
        const { name, value } = target
        setUser({ ...user, [name]: value })
        // console.log(name, value, user)
    }

    const uploadImg = async (ev) => {
        setImg({ ...img, isUploading: true })
        const { secure_url, height, width } = await cloudinaryService.uploadImg(ev)
        setImg({ isUploading: false, imgUrl: secure_url, height, width })
        setUser({ ...user, imgUrl: secure_url })
    }

    const uploadMsg = () => {
        const { imgUrl, isUploading } = img
        if (imgUrl) return 'CHANGE PHOTO'
        return isUploading ? 'UPLOADING...' : 'ADD PHOTO'
    }

    const onUpdateUser = (ev) => {
        ev.preventDefault()
        console.log('updated!');
        dispatch(updateUser(user))
    }

    useEffect(() => {
        if (!loggedInUser) navigate('/login')
        if (isSuccessful) navigate('/user')
        // console.log(loggedInUser)
    }, [isSuccessful, loggedInUser, navigate])


    if (!loggedInUser) return <div></div>

    const { firstName, lastName, bio = '', phone = '', imgUrl = userImg, email } = user

    return (
        <React.Fragment>
            <NavBar />
            <div className="user-edit frame">
                <div className="back"><Link to="/user"><span>&#60;</span> Back</Link></div>
                <div className="profile">Change Info</div>
                <div className="profile-sub">Changes will be reflected to every services</div>
                <form onSubmit={onUpdateUser} className="flex column">
                    <div className="img-con flex align-center">
                        <img src={imgUrl ? imgUrl : userImg} alt="userImg" />
                        <input type="file" onChange={uploadImg} accept="img/*" id="imgUpload" style={{ display: "none" }} />
                        <label htmlFor="imgUpload" className="img-label">{uploadMsg()}</label>
                    </div>
                    <label htmlFor="email">Email (unchangeable)</label>
                    <input type="email" id="email" placeholder="Enter your email..." value={email} readOnly />
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" name="firstName" placeholder="Enter your first name..." value={firstName} onChange={handleChange} />
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" name="lastName" placeholder="Enter your last name..." value={lastName} onChange={handleChange} />
                    <label htmlFor="bio">Bio</label>
                    <textarea name="bio" id="bio" cols="30" rows="5" placeholder="Enter your bio..." value={bio} onChange={handleChange}></textarea>
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" id="phone" name="phone" placeholder="Enter your phone..." value={phone} onChange={handleChange} />
                    <label htmlFor="pass">Password</label>
                    <input type="password" id="pass" name="password" placeholder="Enter your new password..." autoComplete="new-password" onChange={handleChange} />
                    <button>{isLoading ? <Loader /> : 'Save'}</button>
                </form>
            </div>
        </React.Fragment>
    )
}
