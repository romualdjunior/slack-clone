import React, { useEffect, useState } from 'react'
import "./Chat.css"
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { InfoOutlined, StarBorderOutlined } from '@material-ui/icons';
import db from './firebase';
import Message from './Message';
import ChatInput from './ChatInput';



function Chat(props) {

    const [roomDetails, setRoomDetails] = useState(null)
    const [roomMessages, setRoomMessages] = useState([])

    const params = useParams();


    const roomId = params.roomId
    const location = useLocation()
    const navigate = useNavigate()


    const getMessages = () => {
        if (roomId !== "") {
            // console.log("roomId", roomId)
            db.collection('rooms').doc(roomId)
                .onSnapshot((snapshot) => (
                    setRoomDetails(
                        {
                            id: snapshot.id,
                            name: snapshot.data().name
                        }
                    )
                ))
            db.collection('rooms').doc(roomId)
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
        getMessages()
        console.log("roomId", roomId)
        const chat = document.getElementById("chat")
        setTimeout(() => chat.scrollTo(0, chat.scrollHeight), 1000);
    }, [roomId]);






    return (
        <div className="chat" id="chat">
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