import React, { useEffect, useState } from 'react'
import "./Chat.css"
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { InfoOutlined, StarBorderOutlined } from '@material-ui/icons';
import db from './firebase';
import Message from './Message';
import ChatInput from './ChatInput';

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
    const navigate = useNavigate()


    const getMessages = () => {
        if (currentRoomId !== "") {
            console.log(currentRoomId)
            db.collection('rooms').doc(currentRoomId)
                .onSnapshot((snapshot) => (
                    setRoomDetails(
                        {
                            id: snapshot.id,
                            name: snapshot.data().name
                        }
                    )
                ))

            db.collection('rooms').doc(currentRoomId)
                .collection('messages')
                .orderBy("timestamp", "asc")
                .onSnapshot(snapshot =>
                    setRoomMessages(
                        snapshot.docs.map(doc => (
                            {
                                "id": doc.id,
                                "timestamp": doc.data().timestamp,
                                "user": doc.data().user,
                                "userImage": doc.data().userImage,
                                "message": doc.data().message
                            }

                        ))
                    )
                )
        }
    }
    useEffect(() => {
        return () => {
            console.log("currentRoomId", currentRoomId)
            getMessages()


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
                {roomMessages.map(({ message, timestamp, user, userImage, id }) => (
                    <Message key={id}
                        message={message}
                        timestamp={timestamp}
                        user={user}
                        userImage={userImage}
                    />
                ))}
            </div>
            <ChatInput channelName={roomDetails?.name} channelId={roomDetails?.id} />
        </div>
    )
}

export default Chat