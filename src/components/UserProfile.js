import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const UserProfile = () => {
    const { user, isAuthenticated, isLoading, error } = useAuth0();

    useEffect(() => {
        console.log('Authentication Status:', isAuthenticated);
        console.log('Loading Status:', isLoading);
        console.log('Error:', error);
    }, [isAuthenticated, isLoading, error]);

    if (isAuthenticated) {
        return (
            <div>
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>Email: {user.email}</p>
                {/* Add other user information you want to display */}
            </div>
        );
    } else {
        return <p>User is not logged in.</p>;
    }
};

export default UserProfile;

