import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const MovieCard = ({ movie, category, genres }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movie/${movie.id}`);
    };

    const genreName = genres[movie.genre_ids[0]];

    return (
        <div className={`movie-card ${category}`} onClick={handleClick}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie-poster" />
            <div className="movie-info">
                <div className="movie-title">{movie.title}</div>
                <div className="rating-genre">
                    <span className="star">★ {(Math.round(movie.vote_average * 10) / 10).toFixed(1)}</span>
                    | {genreName} • Movie
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
