import { useState, useEffect } from 'react';
import axios from 'axios';

const useMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const movieResponse = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=19193cff750d7dd975d3bdfcb8c10ae7');
                setMovies(movieResponse.data.results);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    return { movies, loading, error };
};

export default useMovies;
