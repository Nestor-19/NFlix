import './TopBanner.scss';
import { Link, useNavigate } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';


const TopBanner = ({movies}) => {
  const navigate = useNavigate();

  const reviews = (movieId) => {
    navigate(`/reviews/${movieId}`);
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