import React from 'react';
import { LoginButton, LogoutButton } from './Authentication';
import logo from '../images/logo.png';

const Navigation = () => {
    return (
        <nav className='navigation'>
            <div className='nav-logo'>
                <img src={logo} alt="aqi tracker logo" />
                <h1>AQI Tracker</h1>
            </div>
            <div className='nav-login'>
                <LoginButton />
                <LogoutButton />
            </div>
        </nav>
    )
}

export default Navigation;

