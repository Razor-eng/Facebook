import React from 'react'
import Header from './Header'
import './css/Home.css'
import Sidebar from './Sidebar'
import Feed from './Feed'
import Widget from './Widget'

export default function Home() {
    return (
        <div className='home'>
            <Header />
            <div className="home_body">
                <Sidebar />
                <Feed />
                <Widget />
            </div>
        </div>
    )
}
