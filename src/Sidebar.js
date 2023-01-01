// import { FiberManualRecord } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import { Add, Apps, BookmarkBorder, Drafts, ExpandLess, ExpandMore, FiberManualRecord, FileCopy, Inbox, PeopleAlt } from '@material-ui/icons'
import { Create } from '@material-ui/icons'
import { InsertComment } from '@material-ui/icons'
import SidebarOption from './SidebarOption'
import db from './firebase'
import { useStateValue } from './StateProvier'
function Sidebar({ history }) {
    const [channels, setChannels] = useState([])
    const [{ user }] = useStateValue()


    useEffect(() => {
        return () => {
            db.collection("rooms").onSnapshot(snapshot => (
                setChannels(snapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().name
                })))
            ))
        }
    }, [])
    console.log("history", history)
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
            <SidebarOption Icon={InsertComment} title="Threads" history={history} />
            <SidebarOption Icon={Inbox} title="Mentions & reactions" history={history} />
            <SidebarOption Icon={Drafts} title="Saved items" history={history} />
            <SidebarOption Icon={BookmarkBorder} title="Channel browser" history={history} />
            <SidebarOption Icon={PeopleAlt} title="People & user groups" history={history} />
            <SidebarOption Icon={Apps} title="Apps" history={history} />
            <SidebarOption Icon={FileCopy} title="File browser" history={history} />
            <SidebarOption Icon={ExpandLess} title="Show less" history={history} />
            <hr />
            <SidebarOption Icon={ExpandMore} title="Channel" history={history} />
            <hr />
            <SidebarOption Icon={Add} title="Add Channel" addChannelOption={true} history={history} />
            {channels.map(channel => (
                <SidebarOption title={channel.name} id={channel.id} key={channel.name} history={history} />
            ))}
        </div>
    )
}

export default Sidebar