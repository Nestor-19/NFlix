import './WatchList.scss'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import useMovies from '../../hooks/useMovies';
import api from '../../api/axiosConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

const WatchList = () => {
    const [watchListMovies, setWatchListMovies] = useState([]);
    const {currentUser} = useContext(UserContext);
    const allMovies = useMovies();
    const token = localStorage.getItem('jwtToken');
    
    const removeFromWatchList = async (movieId) => {
        try {
            const response = await api.delete(`/api/v1/auth/watchList/${movieId}`, {
                headers: {
                    Authorization: `${token}`
                }
            });
            console.log(response);
            setWatchListMovies(prevMovies => prevMovies.filter(movie => movie.imdbId !== movieId));
        } catch (error) {
            console.log(error);
        }
    }

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
    }, [currentUser, allMovies, token]);

    return (
        <div className="watchlist-container">
            <h2>Your Watch List</h2>
            <div className="wl-container">
                {watchListMovies.map((movie, index) => (
                    <div key={index} className="card">
                        <img src={movie.posterLink} alt={movie.title} className="wl-image" />
                        <div className="title-container">
                            <div className="title-text">{movie.title}</div>
                            <button variant="danger" className="minus-button" onClick={() => removeFromWatchList(movie.imdbId)}>
                                <FontAwesomeIcon icon={faMinusCircle} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WatchList