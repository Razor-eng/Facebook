import React, { useState } from 'react'
import './css/Header.css'
import { Apps, ArrowDropDown, Forum, Home, Notifications, OndemandVideo, PeopleAltOutlined, Search, SportsEsportsOutlined } from '@material-ui/icons'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { Avatar, IconButton } from '@material-ui/core';
import firebase from 'firebase/compat/app'

function Header() {
    const user = useSelector(selectUser);
    const [click, setClick] = useState(1)
    return (
        <div className='header'>
            <div className="header_left">
                <img src="/facebook.png" alt="" />
                <div className="header_search">
                    <Search />
                    <input type="text" placeholder='Search Facebook' />
                </div>
            </div>
            <div className="header_middle">
                <div className={`header_option ${click === 1 && 'header_option_active'}`} onClick={e => setClick(1)}>
                    <Home fontSize='large' />
                </div>
                <div className={`header_option ${click === 2 && 'header_option_active'}`} onClick={e => setClick(2)}>
                    <OndemandVideo fontSize='large' />
                </div>
                <div className={`header_option ${click === 3 && 'header_option_active'}`} onClick={e => setClick(3)}>
                    <PeopleAltOutlined fontSize='large' />
                </div>
                <div className={`header_option ${click === 4 && 'header_option_active'}`} onClick={e => setClick(4)}>
                    <SportsEsportsOutlined fontSize='large' />
                </div>
            </div>
            <div className="header_right">
                <div className="header_info" onClick={e => firebase.auth().signOut()} style={{ cursor: 'pointer' }}>
                    <Avatar src={user.photoURL} />
                    <h5>{user.displayName}</h5>
                </div>
                <div className="IconButton">
                    <IconButton>
                        <Apps />
                    </IconButton>
                    <IconButton>
                        <Forum style={{ color: '#2381fa' }} />
                    </IconButton>
                    <IconButton>
                        <Notifications />
                    </IconButton>
                    <IconButton>
                        <ArrowDropDown />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default Header
