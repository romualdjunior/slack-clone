import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useNavigate } from 'react-router-dom';
import db from './firebase';
import "./SidebarOption.css"
// import history from './history'



function SidebarOption({ Icon, title, id, addChannelOption }) {

    let navigate = useNavigate()

    let selectChannel = (path) => {
        if (id) {
            // console.log(`/room/${id}`)
            navigate(`/room/${id}`)
            navigate(1)
        }
        else {
            navigate("/about")
        }
    }


    const addChannel = () => {
        const channelName = prompt("Please enter the channel name")
        if (channelName) {
            db.collection("rooms").add({
                name: channelName,
            })
        }
    }

    return (
        <div className='sidebarOption' onClick={addChannelOption ? addChannel : selectChannel}>
            {Icon && <Icon className="sidebarOption__icon" />}
            {Icon ? (
                <h3> {title}</h3>
            ) : (
                <h3 className='sidebarOption__channel'>
                    <span className='sidebarOption__hash'> #</span>{title}
                </h3>

            )}
        </div>
    )
}

export default SidebarOption