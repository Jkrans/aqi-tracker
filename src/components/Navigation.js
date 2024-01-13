import React from 'react';
import { LoginButton, LogoutButton } from './Authentication';
import logo from '../images/logo.png';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';


const Navigation = () => {
    const { isAuthenticated } = useAuth0();
    return (
        <nav className='navigation'>
            <div className='nav-logo'>
                <Link to="/" className="nav-link">
                    <img src={logo} alt="aqi tracker logo" />
                    <h1>AQI Tracker</h1>
                </Link>
            </div>

            <div className='nav-login'>
                {!isAuthenticated && <LoginButton />}
                {isAuthenticated && <LogoutButton />}
            </div>
        </nav>
    )
}

export default Navigation;

