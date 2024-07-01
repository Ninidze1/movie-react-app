import React from 'react';
import './styles.css';

const MovieDetails = ({ movie }) => (
    <div className="movie-details">
        <h1>{movie.title}</h1>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie-poster-large" />
        <p>{movie.overview}</p>
        <p>Release Date: {movie.release_date}</p>
        <p>Rating: {movie.vote_average}</p>
    </div>
);

export default MovieDetails;
