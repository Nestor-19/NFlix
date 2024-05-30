import './TopBanner.scss';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';

const TopBanner = ({movies}) => {
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