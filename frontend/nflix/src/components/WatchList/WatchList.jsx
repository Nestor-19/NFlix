import './WatchList.scss'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import useMovies from '../../hooks/useMovies';
import api from '../../api/axiosConfig';

const WatchList = () => {
    const [watchListMovies, setWatchListMovies] = useState([]);
    const {currentUser} = useContext(UserContext);
    const allMovies = useMovies();
    const token = localStorage.getItem('jwtToken');

    useEffect(() => {
        const fetchWatchList = async () => {
            try { 
                const response = await api.get('/api/v1/auth/watchList', {params: { jwtToken: token }});
                const userWatchList = response.data.user.watchList;
                const filteredMovies = allMovies.filter(movie => userWatchList.includes(movie.imdbId));
                setWatchListMovies(filteredMovies);
            } catch (error) {
                console.log(error);
            }
        }

        fetchWatchList();
    }, [currentUser, allMovies]);

    return (
        <div className="watchlist-container">
            <h2>Your Watch List</h2>
            <div className="wl-container">
                {watchListMovies.map((movie, index) => (
                    <div key={index} className="card">
                        <img src={movie.posterLink} alt={movie.title} className="wl-image" />
                        <div className="title">{movie.title}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WatchList