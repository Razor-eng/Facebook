import React, { useState } from 'react'
import './css/Login.css'
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../firebase';
import { loginuser } from '../features/userSlice';

const Login = ({ chooseMessage }) => {
    let msg = 'register';
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const toastOptions = {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    }

    const login = (e) => {
        e.preventDefault();
        if (!email) {
        }
        if (!password) {
        }
        auth.signInWithEmailAndPassword(email, password).then(({ user }) => {
            dispatch(loginuser({
                email: user.email,
                uid: user.uid,
                photoURL: user.photoURL,
                displayName: user.displayName
            }))
            console.log(user)
        }).catch(err => toast.error('Something went wrong!', toastOptions))
        setEmail('')
        setPassword('')
    }
    return (
        <div className='login'>
            <img src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg" alt="" className='login_logo' />
            <div className="login_container">
                <h3>Log In To Facebook</h3>
                <form>
                    <center>
                        <input required type="email" placeholder='Email Address' onChange={e => setEmail(e.target.value)} />
                    </center>
                    <center>
                        <input required type="password" placeholder='Password' onChange={e => setPassword(e.target.value)} />
                    </center>
                    <center>
                        <button type='submit' className='login_button' onClick={login}>
                            Log In
                        </button>
                    </center>
                    <center>
                        <div className="sideinfo">
                            <h5>Forgotten Password ?</h5>
                            <div className="create">
                                <div className="hr3" />
                                <h5 className="rtd" onClick={() => chooseMessage(msg)}>Create new account</h5>
                            </div>
                        </div>
                    </center>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login