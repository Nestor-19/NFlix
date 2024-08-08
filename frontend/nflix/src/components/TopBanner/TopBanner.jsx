import './TopBanner.scss';
import { Link, useNavigate } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import api from '../../api/axiosConfig';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';


const TopBanner = ({movies}) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext)
  const token = localStorage.getItem('jwtToken');

  const reviews = (movieId) => {
    navigate(`/reviews/${movieId}`);
  }

  const addToWatchList = async (movieId) => {
    try { 
        const response = await api.post(`/api/v1/auth/watchList/${movieId}`, {jwtToken: token });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className='carousel-container'>
        <Carousel>
            {
                movies?.map((movie) => {
                    return (
                        <Paper key={movie.id}>
                            <div className='card-container'>
                                <div className='movie-card' style={{"--img": `url(${movie.backDrops[0]})`}}>
                                    <div className='movie-detail'>
                                        <div className='movie-poster'>
                                            <img src={movie.posterLink} alt=''/>
                                        </div>
                                        <div className='movie-title'>
                                            <h4>{movie.title}</h4>
                                        </div>
                                        <div className='movie-buttons-container'>
                                            <Link to={`/trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                                                <div className='play-button-icon-container'>
                                                    <FontAwesomeIcon className='play-button-icon' icon={faCirclePlay}/>
                                                </div> 
                                            </Link>
                                            <div className='movie-review-button-container'>
                                                <Button variant="info" onClick={() => reviews(movie.imdbId)}>Reviews</Button>
                                            </div>
                                            {currentUser ? 
                                                <div className='watch-list-container'>
                                                    <Button variant="success" className='watch-list-button' onClick={() => addToWatchList(movie.imdbId)}>
                                                        <FontAwesomeIcon icon={faPlusCircle} />
                                                    </Button>
                                                </div>
                                                : null
                                            }   
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    )
                })
            }
        </Carousel>
    </div>
  )
}

export default TopBanner