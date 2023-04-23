import React, { useEffect } from 'react'
import { AuthFormCmp } from '../cmps/AuthFormCmp'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/actions/authActions'

export function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)

    const onLogin = (userCredentials) => {
        dispatch(login(userCredentials))
    }

    useEffect(() => {
        console.log(loggedInUser)
        if (loggedInUser) {
            console.log('logged in!');
            //if i try to go back it navigates me back to the users page, IS THIS A PROBLEM??
            navigate('/user')
        }
    }, [loggedInUser, navigate])

    const bottomLine = <div>
        Don't have an account yet? <Link to="/">Register</Link>
    </div>

    return (
        <div className="auth-container">
            <AuthFormCmp type="login" title="Login" btnTxt="Login" submitFunc={onLogin} bottomLine={bottomLine} />
        </div>
    )
}
