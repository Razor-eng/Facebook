import React, { useEffect, useState } from 'react'
import './css/Feed.css'
import StoryReel from './StoryReel'
import MessageSender from './MessageSender'
import Post from './Post'
import { db } from '../firebase'

function Feed() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [])

    return (
        <div className='feed'>
            <StoryReel />
            <MessageSender />
            {
                posts.map(post => {
                    return <Post photoURL={post.data.photoURL} image={post.data.image} username={post.data.displayName} timestamp={new Date(post.data.timestamp?.seconds * 1000).toLocaleTimeString()} message={post.data.message} />
                })
            }
        </div>
    )
}

export default Feed
