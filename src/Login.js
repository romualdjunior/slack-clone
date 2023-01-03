import { Button } from '@material-ui/core'
import React from 'react'
import "./Login.css"
import { auth, provider } from "./firebase"
import { useStateValue } from './StateProvier'
import { actionTypes } from './reducer'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [state, dispatch] = useStateValue()
    const navigate = useNavigate()
    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then(result => {
                console.log(result)
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user
                })
                navigate("/room/RONdX0VEPha1aw6DrhKU")

            })
            .catch((error) => {
                alert(error.message)
            })
    }
    return (
        <div className='login'>
            <div className="login__container">
                <img src="https://cdn.futura-sciences.com/sources/images/actu/logo-slack.jpg" alt="" />
                <h1>Sign in to Clever Programmer</h1>
                <p>Cleverprogrammer.slack.com</p>
                <Button onClick={signIn}>Sign in with Google</Button>
            </div>
        </div>

    )
}

export default Login