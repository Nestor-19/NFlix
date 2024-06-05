import './Trailer.scss';
import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player';

const Trailer = () => {
    const params = useParams();
    const id = params.trailerId;

    return (
        <div className='player-container'>
            {id != null ? <ReactPlayer controls='true' playing={true} url ={`https://www.youtube.com/watch?v=${id}`} width = '100%' height='100%'/> : null}
        </div>
    )
}

export default Trailer