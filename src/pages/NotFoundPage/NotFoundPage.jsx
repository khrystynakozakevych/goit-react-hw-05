import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={css.notFoundContainer}>
      <h1>Page Not Found</h1>
      <p>Sorry, the page you're looking for does not exist.</p>
      <Link to="/" className={css.goHomeLink}>
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
