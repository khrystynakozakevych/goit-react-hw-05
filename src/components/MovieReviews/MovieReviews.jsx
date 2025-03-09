import { useEffect, useState } from 'react';
import { getMovieReviews } from '../../assets/tmdb-api';
import css from './MovieReviews.module.css';

const MovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      try {
        setError(null);
        const reviewsData = await getMovieReviews(movieId);
        setReviews(reviewsData);
      } catch (err) {
        setError('Failed to load reviews. Please try again.');
        console.error('Error fetching movie reviews:', err);
      }
    };

    getReviews();
  }, [movieId]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (reviews.length === 0) return <p>No reviews available.</p>;

  return (
    <div className={css.reviewsContainer}>
      <h2>Reviews</h2>
      <ul className={css.reviewsList}>
        {reviews.map(review => (
          <li key={review.id} className={css.reviewItem}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
