import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './Ticker.css';

const CryptoTicker = () => {
    const [cryptoId, setCryptoId] = useState('bitcoin');
    const [cryptoData, setCryptoData] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [dateRange, setDateRange] = useState('7');
    const [suggestions, setSuggestions] = useState([]);
    const [allCoins, setAllCoins] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const ranges = [
        { label: '24H', value: '1' },
        { label: '7D', value: '7' },
        { label: '30D', value: '30' },
        { label: '90D', value: '90' },
        { label: '1Y', value: '365' },
    ];

    // Fetch all available coins on component mount
    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const response = await fetch(
                    'https://api.coingecko.com/api/v3/coins/list?include_platform=false'
                );
                if (!response.ok) throw new Error('Failed to fetch coins list');
                const data = await response.json();
                setAllCoins(data);
            } catch (err) {
                console.error('Error fetching coins list:', err);
            }
        };
        fetchCoins();
    }, []);

    

    // Debounced search function
    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    };

    const searchCoins = useCallback(
        debounce((searchTerm) => {
            if (!searchTerm.trim()) {
                setSuggestions([]);
                return;
            }

            const filtered = allCoins
                .filter(coin =>
                    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .slice(0, 10);

            setSuggestions(filtered);
        }, 300),
        [allCoins]
    );

    useEffect(() => {
        searchCoins(searchInput);
    }, [searchInput, searchCoins]);

    useEffect(() => {
        const fetchCryptoData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch current data
                const response = await fetch(
                    `https://api.coingecko.com/api/v3/coins/${cryptoId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`
                );

                if (!response.ok) {
                    throw new Error('Cryptocurrency not found');
                }

                const data = await response.json();

                // Fetch historical data with selected date range
                const interval = dateRange === '1' ? 'hourly' : 'daily';
                const historyResponse = await fetch(
                    `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=${dateRange}&interval=${interval}`
                );

                if (!historyResponse.ok) {
                    throw new Error('Failed to fetch historical data');
                }

                const historyData = await historyResponse.json();

                const formattedChartData = historyData.prices.map(([timestamp, price]) => ({
                    date: dateRange === '1'
                        ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        : new Date(timestamp).toLocaleDateString(),
                    price: price
                }));

                setCryptoData(data);
                setChartData(formattedChartData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCryptoData();
    }, [cryptoId, dateRange]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            const coin = allCoins.find(c =>
                c.name.toLowerCase() === searchInput.toLowerCase() ||
                c.symbol.toLowerCase() === searchInput.toLowerCase()
            );
            if (coin) {
                setCryptoId(coin.id);
                setSearchInput('');
                setSuggestions([]);
            }
        }
    };

    const handleSuggestionClick = (coin) => {
        setCryptoId(coin.id);
        setSearchInput('');
        setSuggestions([]);
        setShowSuggestions(false);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(price);
    };

    if (loading) {
        return <div className="loading">Loading crypto data...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!cryptoData) return null;

    const priceChange24h = cryptoData.market_data.price_change_percentage_24h;
    const isPriceUp = priceChange24h >= 0;

    return (
        <div className="crypto-container">
            <div className="crypto-card">
                <form onSubmit={handleSearch} className="search-input">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => {
                            setSearchInput(e.target.value);
                            setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        placeholder="Search cryptocurrency..."
                    />
                    {showSuggestions && suggestions.length > 0 && (
                        <div className="search-suggestions">
                            {suggestions.map((coin) => (
                                <div
                                    key={coin.id}
                                    className="search-suggestion-item"
                                    onClick={() => handleSuggestionClick(coin)}
                                >
                                    <div className="suggestion-details">
                                        <div className="suggestion-name">{coin.name}</div>
                                        <div className="suggestion-symbol">{coin.symbol}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </form>

                {/* Rest of the component remains the same */}
                <div className="crypto-header">
                    <img
                        src={cryptoData.image.large}
                        alt={cryptoData.name}
                        className="crypto-icon"
                    />
                    <div className="crypto-name">
                        <h2>{cryptoData.name}</h2>
                        <p>{cryptoData.symbol.toUpperCase()}</p>
                    </div>
                </div>

                <div className="price-container">
                    <div className="current-price">
                        {formatPrice(cryptoData.market_data.current_price.usd)}
                    </div>
                    <div className={`price-change ${isPriceUp ? 'positive' : 'negative'}`}>
                        {priceChange24h.toFixed(2)}%
                    </div>
                </div>

                <div className="chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <XAxis
                                dataKey="date"
                                stroke="rgba(255, 255, 255, 0.5)"
                                fontSize={12}
                                tickMargin={5}
                            />
                            <YAxis
                                stroke="rgba(255, 255, 255, 0.5)"
                                fontSize={12}
                                tickFormatter={(value) => `$${value.toLocaleString()}`}
                                domain={['dataMin', 'dataMax']}
                            />
                            <Tooltip
                                contentStyle={{
                                    background: '#1a1f2c',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    color: 'white'
                                }}
                                formatter={(value) => [`$${value.toLocaleString()}`, 'Price']}
                            />
                            <Line
                                type="monotone"
                                dataKey="price"
                                stroke="#4ade80"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="range-selector">
                    {ranges.map(({ label, value }) => (
                        <button
                            key={value}
                            className={`range-button ${dateRange === value ? 'active' : ''}`}
                            onClick={() => setDateRange(value)}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <div className="stats-grid">
                    <div className="stat-item">
                        <div className="stat-label">Market Cap</div>
                        <div className="stat-value">
                            {formatPrice(cryptoData.market_data.market_cap.usd)}
                        </div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-label">24h Volume</div>
                        <div className="stat-value">
                            {formatPrice(cryptoData.market_data.total_volume.usd)}
                        </div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-label">24h High</div>
                        <div className="stat-value">
                            {formatPrice(cryptoData.market_data.high_24h.usd)}
                        </div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-label">24h Low</div>
                        <div className="stat-value">
                            {formatPrice(cryptoData.market_data.low_24h.usd)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CryptoTicker;