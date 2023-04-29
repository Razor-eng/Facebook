import { Avatar } from '@material-ui/core'
import React from 'react'
import './css/Sidebar.css'

function SidebarOptions({ src, title, Icon, chooseMore }) {
    return (
        <>
            {chooseMore ?
                <div className='sidebar_row' onClick={() => chooseMore(title)}>
                    {src && <Avatar src={src} />}
                    {Icon && <Icon />}
                    <p>{title}</p>
                </div>
                :
                <div className='sidebar_row'>
                    {src && <Avatar src={src} />}
                    {Icon && <Icon />}
                    <p>{title}</p>
                </div>
            }
        </>
    )
}

export default SidebarOptions
