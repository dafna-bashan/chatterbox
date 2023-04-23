import React, { useEffect } from 'react'
import { AuthFormCmp } from '../cmps/AuthFormCmp'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../store/actions/authActions'

export function SignUp() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)

    const onSignUp = (userCredentials) => {
        dispatch(signup(userCredentials))
    }

    useEffect(() => {
        console.log(loggedInUser)
        if (loggedInUser) {
            console.log('signed in!');
            //if i try to go back it navigates me back to the users page, IS THIS A PROBLEM??
            navigate('/user')
        }
    }, [loggedInUser, navigate])


    const bottomLine = <div>
        Already a member? <Link to="/login">Login</Link>
    </div>

    return (
        <div className="auth-container">
            <AuthFormCmp type="signup" title="Join us!" btnTxt="Register" submitFunc={onSignUp} bottomLine={bottomLine} />
        </div>
    )
}
