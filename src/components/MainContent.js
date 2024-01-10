import { useState } from "react"

const MainContent = () => {
    const [city, setCity] = useState('');
    const [aqi, setAqi] = useState(null);
    const [error, setError] = useState(null);


    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const fetchAQI = async () => {
        setError(null);
        setAqi(null);

        try {
            const response = await fetch(`http://localhost:3001/aqi?city=${encodeURIComponent(city)}`);
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
                <h1>Get AQI</h1>

                <input
                    placeholder="Enter Your Location..."
                    value={city}
                    onChange={handleInputChange}
                />

                <button onClick={handleSubmit}>Submit</button>
                {aqi && <p>AQI: {aqi}</p>}
                {error && <p>Error: {error}</p>}
            </div>


        </header>
    )
}

export default MainContent
