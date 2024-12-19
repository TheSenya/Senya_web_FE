import React, { useState, useEffect } from 'react';
import './Weather1.css';

const SimpleWeather = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [location, setLocation] = useState({
        name: 'New York',
        latitude: 40.7128,
        longitude: -74.0060
    });
    const [showSearch, setShowSearch] = useState(false);
    const [searchText, setSearchText] = useState('');

    
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }


                const data = await response.json();
                setWeather(data);
                setError(null);
                console.log(data)
            } catch (err) {
                setError('Error fetching weather data');
                console.error('Weather fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [location]);

    const getWeatherEmoji = (code) => {
        // WMO Weather interpretation codes (WW)
        if (code >= 0 && code <= 3) return '☀️';
        if (code >= 45 && code <= 48) return '🌫️';
        if (code >= 51 && code <= 67) return '🌧️';
        if (code >= 71 && code <= 77) return '🌨️';
        if (code >= 80 && code <= 82) return '🌦️';
        if (code >= 85 && code <= 86) return '🌨️';
        if (code >= 95 && code <= 99) return '⛈️';
        return '⛅';
    };

    if (loading) {
        return <div className="weather-loading">Loading weather information...</div>;
    }

    if (error) {
        return <div className="weather-error">{error}</div>;
    }

    if (!weather) return null;

    const handleLocationSearch = async () => {
        // check if the search is empty and if it is, set showSearch to true
        if (!showSearch && !searchText.trim()) {
            setShowSearch(true);
        } // if the searchtext is empty and search button is clicked, set showSearch to false
        else if (showSearch && !searchText.trim()) {
            setShowSearch(false);
        }
        // if the search is not empty, set showSearch to true and set the location to the searchText
        else if (!showSearch && searchText.trim()) {
            setShowSearch(true);
            setLocation(searchText);
        }

    };


    return (
        <div className="weather-widget-container">
            <div className="weather-widget-header">
                {showSearch ? (
                    <div className='search-container'>
                        <input type="text" placeholder="Search location..." onChange={(e) => setLocation(e.target.value)} />
                    </div>
                ) : (
                    <div className='location-name'>
                        {location.name}
                    </div>
                )}
                <div className='search-container'>
                    <button className='search-button-icon' onClick={handleLocationSearch}>🔍</button>
                </div>
            </div>
            <div className="weather-widget-body">
                <div className="current-conditions">
                    <div className="current-temp">
                        {Math.round(weather.current.temperature_2m)}°
                    </div>
                    <div className="current-date">

                        {/* add date based on current time in that location */}
                        {new Date().toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </div>
                    <div className="current-details">
                        <div>💨 {weather.current.wind_speed_10m} {weather.current_units.wind_speed_10m}</div>
                        <div>💧 {weather.current.relative_humidity_2m}%</div>
                    </div>
                </div>

                <div className="forecast">
                    {weather.daily.time.slice(0, 5).map((date, index) => (
                        <div key={date} className="forecast-day">
                            <span>
                                {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                            </span>
                            <div className='arrow-temp-container'>
                                <div className='arrow-temp'>
                                    <span className="arrow-low">↓</span>
                                    <span className='temp'>{Math.round(weather.daily.temperature_2m_min[index])}°</span>

                                </div>
                                <div className='arrow-temp'>
                                    <span className="arrow-high">↑</span>
                                    <span className='temp'>{Math.round(weather.daily.temperature_2m_max[index])}°</span>
                                </div>
                            </div>


                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default SimpleWeather;