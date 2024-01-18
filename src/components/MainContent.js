import { useState } from "react"
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';


const MainContent = () => {
    const [city, setCity] = useState('');
    const [aqi, setAqi] = useState(null);
    const [error, setError] = useState(null);
    const { isAuthenticated } = useAuth0();
    const navigate = useNavigate();


    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const fetchAQI = async () => {
        setError(null);
        setAqi(null);

        try {
            const baseUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';
            const response = await fetch(`${baseUrl}/aqi?city=${encodeURIComponent(city)}`);

            if (!response.ok) {
                throw new Error('Please try your request again');
            }
            const aqiValue = await response.json();
            setAqi(aqiValue);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchAQI();
    };

    const linkToProfile = () => {
        navigate('/profile');
    };
    return (
        <header className="App-header">
            <div className="main-container">
                <h1>Get AQI</h1>

                <input
                    placeholder="Enter Your Location..."
                    value={city}
                    onChange={handleInputChange}
                />

                <button onClick={handleSubmit} className="button-style">Submit</button>
                {isAuthenticated && <button onClick={linkToProfile} className="button-style">Profile</button>}


                {aqi && <p>AQI: {aqi}</p>}
                {error && <p>Error: {error}</p>}
                <div>
                    {!isAuthenticated && <h2>Log in for personalized text alerts about the air quality in your area.</h2>}
                </div>
            </div>


        </header>)

}

export default MainContent
