import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import useGenres from '../hooks/useGenres';
import useMovies from '../hooks/useMovies';
import '../dashboard/Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const { genres, error: genreError } = useGenres();
    const { movies, loading, error: movieError } = useMovies();
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState(null);

    const handleSearch = async (event) => {
        event.preventDefault();
        if (query.trim() === '') return;

        setSearchLoading(true);
        setSearchError(null);

        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=19193cff750d7dd975d3bdfcb8c10ae7&query=${query}`);
            setSearchResults(response.data.results);
        } catch (error) {
            setSearchError('Failed to fetch results. Please try again.');
        } finally {
            setSearchLoading(false);
        }
    };

    const handleProfileClick = () => {
        navigate('/auth');
    };

    if (loading || searchLoading) return <div>Loading...</div>;
    if (movieError || genreError || searchError) return <div>Error: {movieError || genreError || searchError}</div>;

    const topRatedMovies = movies.slice(0, 4);
    const bestOfActionMovies = movies.slice(4, 12);

    return (
        <div className="dashboard">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for a keyword..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-button">Search</button>
                <img src="././public/profile_placeholder.svg" alt="Profile" className="profile-icon" onClick={handleProfileClick} />
            </form>

            {searchResults.length > 0 && (
                <div className="search-results">
                    <h2>Search Results</h2>
                    <div className="movie-list search-list">
                        {searchResults.map(result => (
                            <MovieCard key={result.id} movie={result} genres={genres} />
                        ))}
                    </div>
                </div>
            )}

            <h2>Top Rated</h2>
            <div className="movie-list top-rated">
                {topRatedMovies.map((movie, index) => (
                    <MovieCard key={movie.id} movie={movie} rank={index + 1} category="top-rated" genres={genres} />
                ))}
            </div>

            <h2>Best of Action</h2>
            <div className="movie-list best-of-action">
                {bestOfActionMovies.map((movie, index) => (
                    <MovieCard key={movie.id} movie={movie} rank={index + 1} category="best-of-action" genres={genres} />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
