import { useState, useEffect } from 'react';
import api from '../api/axiosConfig'

const useMovies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await api.get("/api/v1/movies");
                if (response.status === 200) {
                    setMovies(response.data);
                } else {
                    console.log('Unexpected status code:', response.status);
                }
            } catch (error) {
                console.log('Fetch to get movies failed with error: ' + error);
            }
        };
        fetchMovies();
    }, []);

    return movies;
}

export default useMovies;