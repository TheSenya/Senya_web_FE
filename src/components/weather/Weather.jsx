import React, { useState, useEffect } from 'react';
import './Weather.css';

const WeatherInfo = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [location, setLocation] = useState(() => {
        // Get location from localStorage or use default (New York)
        const saved = localStorage.getItem('weatherLocation');
        return saved ? JSON.parse(saved) : {
            name: 'New York City',
            latitude: 40.7128,
            longitude: -74.0060
        };
    });
    const [newLocation, setNewLocation] = useState('');

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`
                );

                if (!response.ok) {
                    throw new Error('Weather data fetch failed');
                }

                const data = await response.json();
                setWeather(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch weather data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [location]);

    const handleLocationSearch = async () => {
        if (!newLocation.trim()) return;

        try {
            // Using OpenStreetMap Nominatim API for geocoding
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(newLocation)}`
            );

            if (!response.ok) {
                throw new Error('Location search failed');
            }

            const data = await response.json();

            if (data.length === 0) {
                setError('Location not found');
                return;
            }

            const firstResult = data[0];
            const newLocationData = {
                name: firstResult.display_name.split(',')[0],
                latitude: parseFloat(firstResult.lat),
                longitude: parseFloat(firstResult.lon)
            };

            // Save to localStorage
            localStorage.setItem('weatherLocation', JSON.stringify(newLocationData));
            setLocation(newLocationData);
            setNewLocation('');

        } catch (err) {
            setError('Failed to search location');
            console.error(err);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLocationSearch();
        }
    };

    if (loading) {
        return <div className="loading">Loading weather data...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!weather) return null;

    const getDayName = (dateStr) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[new Date(dateStr).getDay()];
    };

    return (
        <div className="weather-container">
            <div className="weather-card">
                {/* Header */}
                <div className="weather-header">
                    <div className="location-input">
                        <input
                            type="text"
                            value={newLocation}
                            onChange={(e) => setNewLocation(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Search location"
                        />
                        <button onClick={handleLocationSearch}>Search</button>
                    </div>
                    <h2>{location.name}</h2>
                    <p>Weather Forecast ⛅</p>
                </div>

                {/* Current Weather */}
                <div className="current-weather">
                    <div>
                        <div className="temperature">
                            {Math.round(weather.current.temperature_2m)}°
                        </div>
                        <div className="current-label">Currently</div>
                    </div>
                    <div className="weather-details">
                        <div className="weather-detail">
                            <span>💨</span>
                            <span>{weather.current.wind_speed_10m} {weather.current_units.wind_speed_10m}</span>
                        </div>
                        <div className="weather-detail">
                            <span>💧</span>
                            <span>{weather.current.relative_humidity_2m}% humidity</span>
                        </div>
                    </div>
                </div>

                {/* Daily Forecast */}
                <div className="forecast-list">
                    {weather.daily.time.slice(0, 5).map((date, index) => (
                        <div key={date} className="forecast-item">
                            <div className="forecast-day">
                                <span className="weather-icon">
                                    {index === 0 ? '☀️' : '⛅'}
                                </span>
                                <span>{getDayName(date)}</span>
                            </div>
                            <div className="weather-detail">
                                <span>🌡️</span>
                                <span>
                                    {Math.round(weather.daily.temperature_2m_min[index])}° -
                                    {Math.round(weather.daily.temperature_2m_max[index])}°
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeatherInfo;