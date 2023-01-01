import React, { useEffect, useState } from 'react'
import "./Chat.css"
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { InfoOutlined, StarBorderOutlined } from '@material-ui/icons';
import db from './firebase';
import Message from './Message';

//  useParams , useLocation change values in useEffect, they display the previous url instead of the actual one
// So we use a global variable to stock the present url from useParams before it is changed in the useEffect to the previous one
let currentRoomId = ""

function Chat(props) {

    const [roomDetails, setRoomDetails] = useState(null)
    const [roomMessages, setRoomMessages] = useState([])
    const params = useParams();

    // roomId value change in useEffect and takes the value found in the previous url
    // to solve this issue we use a global variable 
    const roomId = params.roomId
    currentRoomId = params.roomId
    const location = useLocation()


    useEffect(() => {
        return () => {
            console.log("currentRoomId", currentRoomId)

            if (currentRoomId)
                db.collection('rooms').doc(currentRoomId)
                    .onSnapshot((snapshot) => (
                        setRoomDetails(snapshot.data())
                    ))
            db.collection('rooms').doc(currentRoomId)
                .collection('messages')
                .orderBy("timestamp", "asc")
                .onSnapshot(snapshot =>
                    setRoomMessages(
                        snapshot.docs.map(doc => doc.data())
                    )
                )
        }
    }, [location.pathname])

    // console.log("roomMessages", roomMessages)

    return (
        <div className="chat">
            <div className="chat__header">
                <div className="chat__headerLeft">
                    <h4 className="chat__channelName">
                        <strong>{roomDetails?.name}</strong>
                        <StarBorderOutlined />
                    </h4>
                </div>
                <div className="chat__headerRight">
                    <p>
                        <InfoOutlined /> Details
                    </p>
                </div>
            </div>
            <div className="chat__messages">
                {roomMessages.map(({ message, timestamp, user, url }) => (
                    <Message
                        message={message}
                        timestamp={timestamp}
                        user={user}
                        userImage={url}
                    />
                ))}
            </div>
        </div>
    )
}

export default Chat