import { useState } from "react"
import { useAuth0 } from '@auth0/auth0-react';

const MainContent = () => {
    const [city, setCity] = useState('');
    const [aqi, setAqi] = useState(null);
    const [error, setError] = useState(null);
    const { user, isAuthenticated, isLoading } = useAuth0();

    // test test
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

    return (
        <header className="App-header">
            <div className="main-container">
                <h1>hello, {user.name}</h1>
                <h1>Get AQI</h1>

                <input
                    placeholder="Enter Your Location..."
                    value={city}
                    onChange={handleInputChange}
                />

                <button onClick={handleSubmit}>Submit</button>
                {aqi && <p>AQI: {aqi}</p>}
                {error && <p>Error: {error}</p>}
                <div>
                    <h2>Log in for personalized text alerts about the air quality in your area.</h2>
                </div>
            </div>


        </header>
    )
}

export default MainContent
