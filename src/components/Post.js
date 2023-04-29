import React from 'react'
import './css/Feed.css'
import { Avatar } from '@material-ui/core'
import { ChatBubbleOutline, MoreHoriz, Public, Share, ThumbUp } from '@material-ui/icons'

function Post({ photoURL, image, username, timestamp, message }) {
    return (
        <div className='post'>
            <dv className="post_top">
                <div className="post_topLeft">
                    <Avatar src={photoURL} />
                    <div className="postInfo">
                        <h4>{username}</h4>
                        <p>{timestamp} <Public /></p>
                    </div>
                </div>
                <MoreHoriz />
            </dv>
            <div className="post_middle">
                <p>{message}</p>
                {
                    image &&
                    <img src={image} alt="" />
                }
            </div>
            <div className="post_bottom">
                <div className="post_bottomOptions">
                    <ThumbUp style={{ color: '#2381fa' }} /><p>Like</p>
                </div>
                <div className="post_bottomOptions">
                    <ChatBubbleOutline style={{ color: 'black' }} /><p>Comment</p>
                </div>
                <div className="post_bottomOptions">
                    <Share style={{ color: 'lightgreen' }} /><p>Share</p>
                </div>
            </div>
        </div>
    )
}

export default Post
