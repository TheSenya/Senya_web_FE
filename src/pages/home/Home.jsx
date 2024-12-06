import React from 'react';
import Weather from '../../components/weather/Weather';
import Ticker from '../../components/crypto/Ticker';

function Home() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to the Home Page</h1>
            <p>This is a simple home page for your application.</p>
            <div className='home-grid-container'>
                <div className='home-grid-item'>
                    <div className='weather-container'>
                        <h2>Weather</h2>
                        <Weather />
                    </div>
                </div>
                <div className='home-grid-item'>
                    <div className='ticker-container'>
                        <h2>Ticker</h2>
                        <Ticker></Ticker>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Home;
