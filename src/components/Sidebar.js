import React, { useState } from 'react'
import './css/Sidebar.css'
import SidebarOptions from './SidebarOptions'
import { CalendarTodayTwoTone, ExpandLess, ExpandMore } from '@material-ui/icons'
import { selectUser } from '../features/userSlice'
import { useSelector } from 'react-redux'

function Sidebar() {
    const user = useSelector(selectUser);
    const [val, setVal] = useState('See More')
    const chooseMore = (message) => {
        setVal(message);
        console.log(val)
    };
    return (
        <div className='sidebar'>
            <SidebarOptions src={user.photoURL} title={user.displayName} />
            <SidebarOptions src={'https://www.facebook.com/rsrc.php/v3/yR/r/tInzwsw2pVX.png'} title={"Covid-19 information Center"} />
            <SidebarOptions src={'/images/friends.png'} title={"Friends"} />
            <SidebarOptions src={'/images/groups.png'} title={"Groups"} />
            {
                val === 'See Less' &&
                <SidebarOptions Icon={ExpandMore} title={"See More"} chooseMore={chooseMore} />
            }
            {
                val === 'See More' &&
                <>
                    <SidebarOptions src={'/images/watch.png'} title={"Watch"} />
                    <SidebarOptions Icon={CalendarTodayTwoTone} title={"Events"} />
                    <SidebarOptions Icon={ExpandLess} title={"See Less"} chooseMore={chooseMore} />
                </>
            }
        </div>
    )
}

export default Sidebar
