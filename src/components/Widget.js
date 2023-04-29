import React from 'react'
import './css/Widget.css'
import { MoreHoriz, NotificationsNone, Search, Videocam, VolumeUp } from '@material-ui/icons'
import { Avatar } from '@material-ui/core'

function Widget() {
    return (
        <div className='widget'>
            <div className="widget_header">
                <div className="widget_headerLeft">
                    <h4>Your Pages</h4>
                </div>
                <MoreHoriz />
            </div>
            <div className="widget_body">
                <div className="widget_bodyOptions">
                    <Avatar />
                    <h4>Group</h4>
                </div>
                <div className="widget_bodyOptions ml10">
                    <NotificationsNone />
                    <p>1 Notification</p>
                </div>
                <div className="widget_bodyOptions ml10 mt">
                    <VolumeUp />
                    <p>Create Promotions</p>
                </div>
            </div>

            <hr /><br />

            <div className="widget_header">
                <div className="widget_headerLeft">
                    <h4>Contacts</h4>
                </div>
                <div className="widget_headerRight">
                    <Videocam />
                    <Search />
                    <MoreHoriz />
                </div>
            </div>
            <div className="widget_bodyOptions">
                <Avatar />
                <h4>Group</h4>
            </div>
        </div>
    )
}

export default Widget
