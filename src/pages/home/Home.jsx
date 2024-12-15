import React from 'react';
import Weather from '../../components/weather/Weather';
import Weather1 from '../../components/weather/Weather1';
import Ticker from '../../components/crypto/Ticker';
import './Home.css';

function Home() {
    // You can define which widgets should be large or medium
    const widgets = [
        { id: 1, type: 'weather', size: 'small', title: 'Weather' },
        { id: 2, type: 'weather1', size: 'small', title: 'Weather1' },
        { id: 3, type: 'ticker', size: 'large', title: 'Crypto Ticker' },
        { id: 4, type: 'weather', size: 'small', title: 'Quick Weather' },
        { id: 5, type: 'ticker', size: 'small', title: 'Market Summary' },
        // Add more widgets as needed
    ];

    const renderWidget = (widget) => {
        switch (widget.type) {
            case 'weather':
                return <Weather />;
            case 'ticker':
                return <Ticker />;
            case 'weather1':
                return <Weather1 />;
            default:
                return null;
        }
    };

    return (
        <div className="home-container">
            <div className="home-title">
                <h1>Welcome to the Dashboard</h1>
                <p>View all your widgets in one place</p>
            </div>
            
            <div className="widget-grid">
                {widgets.map((widget) => (
                    <div 
                        key={widget.id}
                        className={`widget-item ${widget.size || ''}`}
                    >
                        <div className="widget-header">
                            <h2>{widget.title}</h2>
                            {/* Optional: Add widget controls here */}
                            <div className="widget-controls">
                                {/* Add any controls like refresh, settings, etc. */}
                            </div>
                        </div>
                        <div className="widget-content">
                            {renderWidget(widget)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;