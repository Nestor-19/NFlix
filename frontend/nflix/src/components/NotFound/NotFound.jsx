import { Link } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found__content">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__message">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="not-found__link">Go back to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
