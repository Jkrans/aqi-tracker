import React, { StrictMode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <button onClick={() => loginWithRedirect()}>Log In</button>;
};


export const LogoutButton = () => {
    const { logout } = useAuth0();
    const handleLogout = () => {
        console.log("Current origin:", window.location.origin); // For debugging
        setTimeout(() => { logout({ returnTo: window.location.origin }); }, 3000)


    };
    return <button onClick={handleLogout}>Log Out</button>;
};
