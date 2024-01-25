import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserProfile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [testData, setTestData] = useState([]);

    const sendEmailToBackend = async (email) => {
        try {
            const response = await fetch('https://aqi-tracker-production.up.railway.app/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            if (!response.ok) throw new Error('Failed to send email');
            const data = await response.json();
            console.log(data); // Handle the response data as needed
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            sendEmailToBackend(user.email);
        }
    }, [isAuthenticated, user]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://aqi-tracker-production.up.railway.app/api/test');
                if (!response.ok) throw new Error('Failed to fetch. Try harder.');
                const data = await response.json();
                setTestData(data);
            } catch (err) {
                console.error(err.message);
            }
        }
        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated && (
            <div className="user-profile">
                <div className="user-info">
                    {/* <img src={user.picture} alt={user.name} className="user-picture" /> */}
                    <h2 className="user-name">{user.email}</h2>
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
                <div>
                    <p>Testing...</p>
                    {testData.map((item, index) => (
                        <div key={index}><p>{item.name}</p></div>
                    ))}
                </div>
            </div>
        )
    );
};

export default UserProfile;
