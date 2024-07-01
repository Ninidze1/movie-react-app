import React, { useState } from 'react';
import axios from 'axios';
import './Search.css';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (event) => {
        event.preventDefault();
        if (query.trim() === '') return;

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/keyword?api_key=19193cff750d7dd975d3bdfcb8c10ae7&query=${query}`);
            setResults(response.data.results);
        } catch (error) {
            setError('Failed to fetch results. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="search">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for a keyword..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-button">Search</button>
            </form>
            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">{error}</div>}
            <div className="search-results">
                {results.map(result => (
                    <div key={result.id} className="search-result">
                        <h3>{result.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
