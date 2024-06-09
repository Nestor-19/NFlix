import { useState, useEffect } from 'react';
import api from '../api/axiosConfig'

const useMovie = (imdbId) => {
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fecthMovie = async () => {
            try {
                const response = await api.get(`/api/v1/movies/${imdbId}`);
                const singleMovie = response.data;
                setMovie(singleMovie);
                setReviews(singleMovie.reviewIds);
            } catch (error) {
                console.error(error);
            }
        }

        if (imdbId) fecthMovie();
    }, [imdbId])

    return {movie, reviews, setReviews};
}

export default useMovie