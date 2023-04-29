import { Avatar, IconButton, Modal } from '@material-ui/core'
import { Close, InsertEmoticon, PhotoLibrary, VideoCall } from '@material-ui/icons'
import React, { useState } from 'react'
import './css/Feed.css'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { db, storage } from '../firebase';
import firebase from 'firebase/compat/app';

function MessageSender() {
    const [open, setOpen] = useState(false);
    const user = useSelector(selectUser);
    const [image, setImage] = useState('');
    const [message, setMessage] = useState('')
    const [progress, setProgress] = useState(0)

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
            db.collection('posts').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: message,
                displayName: user.displayName,
                photoURL: user.photoURL
            })
        } else {
            const uploadTask = storage.ref(`images/${image.name}`).put(image);

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
                    storage.ref('images').child(image.name).getDownloadURL().then(url => {
                        db.collection('posts').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            message: message,
                            displayName: user.displayName,
                            photoURL: user.photoURL,
                            image: url
                        })
                    });
                }
            )
        }
        handleClose();
        setMessage('')
        setImage('')
        setProgress(0)
    }
    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <div className="modal">
                    <form>
                        <div className="modal_heading">
                            <h3>Create Post</h3>
                            <IconButton onClick={handleClose}>
                                <Close />
                            </IconButton>
                        </div>

                        <div className="modal_header_top">
                            <Avatar src={user.photoURL} />
                            <h5>{user.displayName}</h5>
                        </div>
                        <div className="modalBody">
                            <textarea placeholder={`What's on your mind?`} rows="5" onChange={e => setMessage(e.target.value)}>{message}</textarea>
                        </div>
                        <div className="modal_footer">
                            <div className="modal_footerLeft">
                                <h4>Add to your post</h4>
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
            <div className='messageSender'>
                <div className="messageSender_top">
                    <Avatar src={user.photoURL} />
                    <form>
                        <input type="text" placeholder={`What's on your mind? ${'name'}`} onClick={handleOpen} />
                    </form>
                </div>

                <div className="messageSender_bottom">
                    <div className="messangerOptions">
                        <VideoCall style={{ color: 'red' }} fontSize='large' />
                        <p>Live Video</p>
                    </div>
                    <div className="messangerOptions">
                        <PhotoLibrary style={{ color: 'lightgreen' }} fontSize='large' />
                        <p>Live Photo/Video</p>
                    </div>
                    <div className="messangerOptions">
                        <InsertEmoticon style={{ color: '#ffb100' }} fontSize='large' />
                        <p>Feeling/Activity</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MessageSender
