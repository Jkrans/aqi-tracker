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
            const response = await fetch(
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}
                ?contentType=json&unitGroup=metric&key=${process.env.REACT_APP_VISUAL_CROSSING_API_KEY}
                &elements=datetime,aqius`
            );
            if (!response.ok) {
                throw new Error('Please try your request again');
            }
            const data = await response.json();
            console.log(data)
            setAqi(data.currentConditions.aqius);

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
