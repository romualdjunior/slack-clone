// import { FiberManualRecord } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import { Add, Apps, BookmarkBorder, Drafts, ExpandLess, ExpandMore, FiberManualRecord, FileCopy, Inbox, PeopleAlt } from '@material-ui/icons'
import { Create } from '@material-ui/icons'
import { InsertComment } from '@material-ui/icons'
import SidebarOption from './SidebarOption'
import db from './firebase'

import { useStateValue } from './StateProvier'
import { useLocation } from 'react-router-dom'


function Sidebar() {
    const [channels, setChannels] = useState([])
    const [isPageLoaded, setPageLoaded] = useState(false)
    const [{ user }] = useStateValue()
    const location = useLocation()

    const getHome = () => {
        db.collection("rooms").onSnapshot(snapshot => {
            setChannels(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().name
                }))
            )
        })
    }

    useEffect(() => {
        return () => {
            getHome()
        }
    }, [location.pathname])

    if (isPageLoaded === false) {
        getHome()
        setPageLoaded(true)
    }

    console.log("channels channels", channels)

    return (
        <div className='sidebar'>
            <div className="sidebar__header">
                <div className="sidebar__info">
                    <h2>Clever Programmer</h2>
                    <h3>
                        <FiberManualRecord />
                        {user?.displayName}
                    </h3>
                </div>
                <Create />
            </div>
            <SidebarOption Icon={InsertComment} title="Threads" />
            <SidebarOption Icon={Inbox} title="Mentions & reactions" />
            <SidebarOption Icon={Drafts} title="Saved items" />
            <SidebarOption Icon={BookmarkBorder} title="Channel browser" />
            <SidebarOption Icon={PeopleAlt} title="People & user groups" />
            <SidebarOption Icon={Apps} title="Apps" />
            <SidebarOption Icon={FileCopy} title="File browser" />
            <SidebarOption Icon={ExpandLess} title="Show less" />
            <hr />
            <SidebarOption Icon={ExpandMore} title="Channel" />
            <hr />
            <SidebarOption Icon={Add} title="Add Channel" addChannelOption={true} />
            {channels.map(channel => (
                <SidebarOption title={channel.name} id={channel.id} key={channel.id} />
            ))}
        </div>
    )
}

export default Sidebar