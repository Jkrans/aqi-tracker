import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const UserProfile = () => {
    const { user, isAuthenticated } = useAuth0();
    if (isAuthenticated) {
        return (
            <div>
                <img src="http://placehold.it/" alt={user.name} />
                <h2>{user.name}</h2>
                <p>Email: {user.email}</p>
            </div>
        )
    }
    else {
        <p>User is not logged in.</p>
    }

}

export default UserProfile
