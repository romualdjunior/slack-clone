import React from 'react'
// import styled from 'styled-components'
import { Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import "./Header.css"

function Header({ user, signOut }) {
    return (
        <div className="header">
            <div className="header__left">
                <Avatar className="header__avatar" alt="avatar" src="" />
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



