import './Trailer.scss';
import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player';

const Trailer = () => {
    const {trailerId} = useParams();

    return (
        <div className='player-container'>
            {trailerId != null ? <ReactPlayer controls={true} playing={true} url ={`https://www.youtube.com/watch?v=${trailerId}`} width = '100%' height='100%'/> : null}
        </div>
    )
}

export default Trailer