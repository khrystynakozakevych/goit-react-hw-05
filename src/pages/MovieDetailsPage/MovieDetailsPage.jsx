import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../../assets/tmdb-api';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
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

  return (
    <div>
      <button onClick={handleGoBack}>Go back</button>
      <h1>{movie.title}</h1>
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      )}
      <p>{movie.overview}</p>
      <MovieCast movieId={movieId} />
      <MovieReviews movieId={movieId} />
    </div>
  );
};

export default MovieDetailsPage;
