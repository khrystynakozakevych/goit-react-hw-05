import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { getMovieDetails } from '../../assets/tmdb-api';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      try {
        setError(null);
        const movieData = await getMovieDetails(movieId);
        setMovie(movieData);
      } catch (err) {
        setError('Failed to fetch movie details. Please try again.');
        console.error('Error fetching movie details:', err);
      }
    };

    getMovie();
  }, [movieId]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!movie) return <div>Loading...</div>;

  const handleGoBack = () => {
    navigate(-1) || navigate('/movies');
  };

  const isCastActive = location.pathname.includes('cast');
  const isReviewsActive = location.pathname.includes('reviews');

  return (
    <main className={css.movie_details_page_container}>
      <button onClick={handleGoBack}>Go back</button>
      <h2>{movie.title}</h2>
      <div className={css.img_overview_wrapper}>
        {movie.poster_path && (
          <img
            className={css.movie_img}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        )}
        <p>{movie.overview}</p>
      </div>
      <div className={css.movie_info_wrapper}>
        <Link className={css.cast} to={`/movies/${movieId}/cast`}>
          Cast
        </Link>
        <Link className={css.reviews} to={`/movies/${movieId}/reviews`}>
          Reviews
        </Link>
      </div>
      {isCastActive && <MovieCast movieId={movieId} />}
      {isReviewsActive && <MovieReviews movieId={movieId} />}
    </main>
  );
};

export default MovieDetailsPage;
