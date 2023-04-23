import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NavBar } from '../cmps/NavBar'
import userImg from '../assets/img/user-img.png'
import { useDispatch, useSelector } from 'react-redux'

export function UserInfo() {

    const loggedInUser = useSelector(state => state.userModule.loggedInUser)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // const onLogout = () => {
    //     console.log('logout')
    //     dispatch(logout())
    // }

    useEffect(() => {
        dispatch({ type: 'RESTART' })
    }, [dispatch])


    useEffect(() => {
        if (!loggedInUser) navigate('/login')
    }, [loggedInUser, navigate])


    if (!loggedInUser) return <div></div>

    const { firstName, lastName, bio, phone, imgUrl = userImg, email } = loggedInUser
    return (
        <React.Fragment>
            <NavBar />
            <div className="user-info">
                <div className="center">
                    <div className="title">Personal info</div>
                    <div className="subtitle">Basic info, like your name and photo</div>
                </div>
                <div className="frame">
                    <div className="profile-container flex align-center">
                        <div className="full">
                            <div className="profile" style={{ marginLeft: 0 }}>Profile</div>
                            <div className="profile-sub">Some info may be visible to other people</div>
                        </div>
                        <Link to="/user/edit" className="edit">Edit</Link>
                    </div>
                    <div className="field img-con">
                        <div>PHOTO</div>
                        <img src={imgUrl ? imgUrl : userImg} alt="userImg" />
                    </div>
                    <div className="field">
                        <div>NAME</div>
                        <div>{firstName} {lastName}</div>
                    </div>
                    <div className="field">
                        <div>BIO</div>
                        <div>{bio}</div>
                    </div>
                    <div className="field">
                        <div>PHONE</div>
                        <div>{phone}</div>
                    </div>
                    <div className="field">
                        <div>EMAIL</div>
                        <div>{email}</div>
                    </div>
                    <div className="field">
                        <div>PASSWORD</div>
                        <div>********</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
