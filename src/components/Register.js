import React, { useEffect, useState } from 'react'
import './css/Register.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../firebase';
import { loginuser } from '../features/userSlice';
import { useDispatch } from 'react-redux';

const Register = ({ chooseMessage }) => {
    let msg = 'login';

    const [firstName, setFirstName] = useState('')
    // const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [birthday, setBirthday] = useState([])
    const [gender, setGender] = useState('')
    const [photoURL, setPhotoURL] = useState('')
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
    let imgGen = '';

    const generateDiceBearAvataaars = (seed) =>
        `https://api.multiavatar.com/4645646${seed}.svg`;

    useEffect(() => {
        // eslint-disable-next-line
        imgGen = generateDiceBearAvataaars(Math.round(Math.random() * 1000));
        setPhotoURL(imgGen)
    }, [])

    const register = (e) => {
        e.preventDefault();
        if (!firstName) {
            toast.warn('Name is Required!', toastOptions);
        }
        if (!email) {
            toast.warn('Email is Required!', toastOptions);
        }
        if (!password) {
            toast.warn('Password is Required!', toastOptions);
        }
        if (!photoURL) {
            setPhotoURL(imgGen)
        }
        auth.createUserWithEmailAndPassword(email, password).then((userAuth) => {
            userAuth.user.updateProfile({
                displayName: firstName,
                dob: birthday[0] + '/' + birthday[1] + '/' + birthday[2],
                photoURL: photoURL
            }).then(() => {
                dispatch(loginuser({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: firstName,
                    photoURL: userAuth.user.photoURL
                }))
            })
            console.log(userAuth)
        }).catch(error => alert(error));

        setEmail('')
        setPassword('')
        setFirstName('')
        // setLastName('')
        setBirthday([])
        setGender('')
    }
    return (
        <div className='register'>
            <img src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg" alt="" className='register_logo' />
            <div className="register_container">
                <h1>Sign Up</h1>
                <p>It's quick and easy</p>
                <div className="hr3" />
                <form>
                    <div className="row">
                        <input required className='register_name' type="name" placeholder='Full Name' onChange={e => setFirstName(e.target.value)} />
                        {/* <input required className='register_name' type="name" placeholder='Last Name' onChange={e => setLastName(e.target.value)} /> */}
                    </div>
                    <center>
                        <input required type="email" placeholder='Email Address' onChange={e => setEmail(e.target.value)} />
                    </center>
                    <center>
                        <input required type="password" placeholder='Password' onChange={e => setPassword(e.target.value)} />
                    </center>
                    <center>
                        <input type="url" placeholder='Photo url' onChange={e => setPhotoURL(e.target.value)} />
                    </center>
                    <h5 className="register_date">Date of Birth</h5>
                    <div className="dates">
                        <select required className='register_date2' onChange={e => setBirthday([...birthday, e.target.value])}>
                            <option value="Day">Day</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                        </select>
                        <select required className='register_date3' onChange={e => setBirthday([...birthday, e.target.value])}>
                            <option value="Month">Month</option>
                            <option value="1">Jan</option>
                            <option value="2">Feb</option>
                            <option value="3">Mar</option>
                            <option value="4">Apr</option>
                            <option value="5">May</option>
                            <option value="6">Jun</option>
                            <option value="7">Jul</option>
                            <option value="8">Aug</option>
                            <option value="9">Sep</option>
                            <option value="10">Oct</option>
                            <option value="11">Nov</option>
                            <option value="12">Dec</option>
                        </select>
                        <select required className='register_date3' onChange={e => setBirthday([...birthday, e.target.value])}>
                            <option value="Year">Year</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                            <option value="2019">2019</option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                            <option value="2015">2015</option>
                            <option value="2014">2014</option>
                            <option value="2013">2013</option>
                            <option value="2012">2012</option>
                            <option value="2011">2011</option>
                            <option value="2010">2010</option>
                            <option value="2009">2009</option>
                            <option value="2008">2008</option>
                            <option value="2007">2007</option>
                            <option value="2006">2006</option>
                            <option value="2005">2005</option>
                            <option value="2004">2004</option>
                            <option value="2003">2003</option>
                            <option value="2002">2002</option>
                            <option value="2001">2001</option>
                            <option value="2000">2000</option>
                            <option value="1999">1999</option>
                            <option value="1998">1998</option>
                            <option value="1997">1997</option>
                            <option value="1996">1996</option>
                            <option value="1995">1995</option>
                            <option value="1994">1994</option>
                            <option value="1993">1993</option>
                            <option value="1992">1992</option>
                            <option value="1991">1991</option>
                            <option value="1990">1990</option>
                        </select>
                    </div>

                    <h5 className="register_gender">Gender</h5>
                    <div className="register_radiocontainer">
                        <div className="wrapper">
                            <label>Female</label>
                            <input onChange={e => setGender(e.target.value)} type='radio' name='gender' value='female' />
                        </div>
                        <div className="wrapper">
                            <label>Male</label>
                            <input onChange={e => setGender(e.target.value)} type='radio' name='gender' value='male' />
                        </div>
                        <div className="wrapper">
                            <label>Other</label>
                            <input onChange={e => setGender(e.target.value)} type='radio' name='gender' />
                        </div>
                    </div>

                    <p className="register_policy">By clicking Sign Up, you agree to our{" "}
                        <span>Terms, Data Policy</span> and <span>Cookie Policy</span>. You may receive SMS
                        notifications from us and can opt out at any time.
                    </p>

                    <center>
                        <button onClick={register} className="register_button">
                            Sign Up
                        </button>
                    </center>

                    <center>
                        <p onClick={() => chooseMessage(msg)} className="register_login">Already have an account ?</p>
                    </center>
                </form>
            </div>
            <ToastContainer />
        </div >
    )
}

export default Register