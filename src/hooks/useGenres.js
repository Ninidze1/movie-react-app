import { useState, useEffect } from 'react';
import axios from 'axios';

const useGenres = () => {
    const [genres, setGenres] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGenres = async () => {
            const cachedGenres = localStorage.getItem('genres');
            if (cachedGenres) {
                setGenres(JSON.parse(cachedGenres));
            } else {
                try {
                    const genreResponse = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=936d7807b77bbb4238f8847775a026ad');
                    const genres = genreResponse.data.genres.reduce((acc, genre) => {
                        acc[genre.id] = genre.name;
                        return acc;
                    }, {});
                    localStorage.setItem('genres', JSON.stringify(genres));
                    setGenres(genres);
                } catch (error) {
                    setError(error.message);
                }
            }
        };

        fetchGenres();
    }, []);

    return { genres, error };
};

export default useGenres;
