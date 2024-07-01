import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Detailed.css';

const Detailed = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=19193cff750d7dd975d3bdfcb8c10ae7&append_to_response=credits`);
                setMovie(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="detailed">
            <div className="detailed-header">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="detailed-poster" />
                <div className="info-container">
                    <div className="detailed-info">
                        <h1>{movie.title}</h1>
                        <div className="genres">
                            {movie.genres.map(genre => (
                                <span key={genre.id} className="genre">{genre.name}</span>
                            ))}
                        </div>
                        <div className="ratings">
                            <span className="rating">IMDb: {(Math.round(movie.vote_average * 10) / 10).toFixed(1)}</span>
                            <span className="rating">PG: {movie.adult ? '18+' : '13+'}</span>
                            <span className="rating">Duration: {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
                        </div>
                        <p className="overview">{movie.overview}</p>
                        <div className="buttons">
                            <button className="watch-trailer">WATCH TRAILER</button>
                            <button className="watchlist">TO WATCHLIST</button>
                        </div>
                        <div className="additional-info">
                        </div>
                    </div>
                    <div className='details-sidebar'>
                        <div className="info-section">
                            <h2>Director</h2>
                            <p>{movie.credits.crew.find(member => member.job === 'Director').name}</p>
                        </div>
                        <div className="info-section">
                            <h2>Writers</h2>
                            <p>{movie.credits.crew.filter(member => member.department === 'Writing').map(member => member.name).join(', ')}</p>
                        </div>
                        <div className="info-section">
                            <h2>Stars</h2>
                            <p>{movie.credits.cast.slice(0, 3).map(actor => actor.name).join(', ')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detailed;
