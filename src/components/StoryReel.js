import React, { useEffect, useState } from 'react'
import './css/Feed.css'
import { Avatar, IconButton, Modal } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { db, storage } from '../firebase';
import firebase from 'firebase/compat/app';
import { AddCircleOutline, Close, InsertEmoticon, PhotoLibrary, VideoCall } from '@material-ui/icons'
import Reels from './Reels'

function StoryReel() {
    const [open, setOpen] = useState(false);
    const user = useSelector(selectUser);
    const [image, setImage] = useState('');
    const [progress, setProgress] = useState(0)
    const [story, setStory] = useState([])
    let i = 0;

    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }

    const uploadFile = () => {
        document.getElementById('imageFile').click();
    }

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleUpload = (e) => {
        e.preventDefault();
        if (image === '') {
            db.collection('story').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                displayName: user.displayName,
                photoURL: user.photoURL
            })
        } else {
            const uploadTask = storage.ref(`stories/${image.name}`).put(image);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress(progress);
                },
                (error) => {
                    alert(error)
                },
                () => {
                    storage.ref('stories').child(image.name).getDownloadURL().then(url => {
                        db.collection('story').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            displayName: user.displayName,
                            photoURL: user.photoURL,
                            image: url
                        })
                    });
                }
            )
        }
        handleClose();
        setImage('')
        setProgress(0)
    }

    useEffect(() => {
        db.collection('story').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setStory(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        i = 0;
    }, [])

    console.log(story)
    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <div className="modal">
                    <form>
                        <div className="modal_heading">
                            <h3>Create Story</h3>
                            <IconButton onClick={handleClose}>
                                <Close />
                            </IconButton>
                        </div>

                        <div className="modal_header_top">
                            <Avatar src={user.photoURL} />
                            <h5>{user.displayName}</h5>
                        </div>
                        <div className="modal_footer">
                            <div className="modal_footerLeft">
                                <h4>Add to your Story</h4>
                            </div>
                            <div className="modal_footerRight">
                                <IconButton onClick={uploadFile}>
                                    <PhotoLibrary style={{ color: 'lightgreen' }} fontSize='large' />
                                </IconButton>
                                <input type="file" id="imageFile" onChange={handleChange} style={{ display: 'none' }} />
                                <IconButton>
                                    <VideoCall fontSize='large' style={{ color: 'red' }} />
                                </IconButton>
                                <IconButton>
                                    <InsertEmoticon fontSize='large' style={{ color: '#ffb100' }} />
                                </IconButton>
                            </div>
                        </div>
                        {
                            image !== '' &&
                            <h2 style={{ fontSize: '15px', marginBottom: '20px', color: 'green' }}>Image is added and will be displayed after you post</h2>
                        }
                        {
                            progress != '' &&
                            <progress value={progress} max='100' style={{ width: '100%', marginBottom: '20px' }} />
                        }
                        <input type='submit' className='post_submit' value='POST' onClick={handleUpload} />
                    </form>
                </div>
            </Modal >
            <div className='reel' onClick={handleOpen}>
                <div className='storyReel'>
                    <div className="story">
                        <div className="plus">
                            <AddCircleOutline fontSize='large' style={{ color: 'gray' }} />
                        </div>
                    </div>
                </div>
                {
                    story.map(post => {
                        return (
                            <Reels photoURL={post.data.photoURL} image={post.data.image} username={post.data.displayName} i={i++} />
                        )
                    })
                }
            </div>
        </>
    )
}

export default StoryReel
