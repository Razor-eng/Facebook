import { Avatar } from '@material-ui/core'
import React from 'react'

function Reels({ photoURL, image, username, i }) {
    console.log(i)
    return (
        <>
            {i <= 2 &&
                <div div className='storyReel'>
                    <div className="story" style={{ backgroundImage: `url(${image})` }}>
                        <Avatar src={photoURL} />
                        <h4>{username}</h4>
                    </div>
                </div>
            }
        </>
    )
}

export default Reels
