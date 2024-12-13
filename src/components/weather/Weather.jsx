import React, { useState, useEffect } from 'react';
import './Weather.css';

const WeatherWidget = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showSearch, setShowSearch] = useState(false);
    const [location, setLocation] = useState(() => {
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
                    `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
                );

                if (!response.ok) throw new Error('Weather data fetch failed');
                const data = await response.json();
                setWeather(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch weather data');
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [location]);

    const handleLocationSearch = async () => {
        if (!newLocation.trim()) return;
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(newLocation)}`
            );
            if (!response.ok) throw new Error('Location search failed');
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

            localStorage.setItem('weatherLocation', JSON.stringify(newLocationData));
            setLocation(newLocationData);
            setNewLocation('');
            setShowSearch(false);
        } catch (err) {
            setError('Failed to search location');
        }
    };

    if (loading) {
        return <div className="widget-loading">Loading...</div>;
    }

    if (error) {
        return <div className="widget-error">{error}</div>;
    }

    if (!weather) return null;

    return (
        <div className="weather-widget-container">
            <div className="weather-widget">
                <div className="widget-header">
                    <button 
                        className="widget-search-toggle"
                        onClick={() => setShowSearch(!showSearch)}
                    >
                        🔍
                    </button>
                    {showSearch && (
                        <div className="widget-search">
                            <input
                                type="text"
                                value={newLocation}
                                onChange={(e) => setNewLocation(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleLocationSearch()}
                                placeholder="Search location..."
                            />
                        </div>
                    )}
                    <h2 className="widget-location">{location.name}</h2>
                </div>

                <div className="current-conditions">
                    <div className="current-temp">
                        {Math.round(weather.current.temperature_2m)}°
                    </div>
                    <div className="current-details">
                        <div>💨 {weather.current.wind_speed_10m} {weather.current_units.wind_speed_10m}</div>
                        <div>💧 {weather.current.relative_humidity_2m}%</div>
                    </div>
                </div>

                <div className="forecast">
                    {weather.daily.time.slice(0, 3).map((date, index) => (
                        <div key={date} className="forecast-day">
                            <span>
                                {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                            </span>
                            <span>
                                {Math.round(weather.daily.temperature_2m_min[index])}° - 
                                {Math.round(weather.daily.temperature_2m_max[index])}°
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeatherWidget;