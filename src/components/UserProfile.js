import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserProfile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated && (
            <div className="user-profile">
                <div className="user-info">
                    {/* <img src={user.picture} alt={user.name} className="user-picture" /> */}
                    <h2 className="user-name">{user.name}</h2>
                    {/* <p className="user-email">{user.email}</p> */}
                </div>
                <div className="aqi-alerts">
                    <h3>Your Alerts</h3>
                    <p>Nothing here yet...</p>
                </div>
                <div className="aqi-alerts">
                    <h3>AQI Alerts</h3>
                    <input type="text" placeholder="Alert Name" className="alert-name-input" />
                    <input type="number" placeholder="50 - 300" min="50" max="300" className="alert-number-input" />
                    <button className="add-new-button">Add New</button>
                </div>
            </div>
        )
    );
};

export default UserProfile;
