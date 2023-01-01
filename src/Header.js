import React from 'react'
// import styled from 'styled-components'
import { Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import "./Header.css"
import { useStateValue } from './StateProvier';

function Header() {
    const [{ user }] = useStateValue()

    return (
        <div className="header">
            <div className="header__left">
                <Avatar className="header__avatar" alt={user?.displayName} src={user?.photoURL} />
                <AccessTimeIcon />
            </div>

            <div className="header__search">
                <SearchIcon />
                <input type="text" placeholder='Search Cleve Programmers' />
            </div>
            <div className="header__right">
                <HelpOutlineIcon />
            </div>
        </div>
    )
}

export default Header



