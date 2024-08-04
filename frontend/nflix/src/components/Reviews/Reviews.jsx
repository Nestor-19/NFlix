import { useContext, useRef } from 'react';
import './Reviews.scss'
import api from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from '../ReviewForm/ReviewForm';
import useMovie from '../../hooks/useMovie';
import { UserContext } from '../../context/UserContext';

const Reviews = () => {
    const revText = useRef();
    const { movieId } = useParams();
    const { movie, reviews, setReviews } = useMovie(movieId);
    const { currentUser } = useContext(UserContext);

    const addReview = async (e) => {
        e.preventDefault();
        const rev = revText.current;
        if (rev.value != '') {
            try {
                const response = await api.post("/api/v1/reviews", {reviewBody: rev.value, imdbId: movieId, username: currentUser.username});
                const updatedReviews = [...reviews, {body: rev.value}];
                rev.value = "";
                setReviews(updatedReviews);
            } catch(error) {
                console.error(error);
            }
        }
    }

  return (
    <Container>
        <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className="mt-2">
            <Col>
                <img src={movie?.posterLink} alt="" className="poster"/>
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                {currentUser ? (
                                    <ReviewForm
                                        handleSubmit={addReview}
                                        revText={revText}
                                        labelText="Write a Review?"
                                    />
                                ) : null}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                }
                {
                    reviews?.map((review, index) => {
                        return(
                            <div key={index} className="review-item">
                                <Row>
                                    <Col md={10} className="review-body">{review.body}</Col>
                                    <Col md={2} className="review-username text-end">{review.user.username}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>                                
                            </div>
                        )
                    })
                }
            </Col>
        </Row>
        <Row>
            <Col>
                <hr />
            </Col>
        </Row>        
    </Container>
  )
}

export default Reviews
