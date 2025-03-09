import { useEffect, useState } from 'react';
import { getMovieCast } from '../../assets/tmdb-api';
import css from './MovieCast.module.css';

const MovieCast = ({ movieId }) => {
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCast = async () => {
      try {
        setError(null);
        const castData = await getMovieCast(movieId);
        setCast(castData);
      } catch (err) {
        setError('Failed to load cast. Please try again.');
        console.error('Error fetching movie cast:', err);
      }
    };

    getCast();
  }, [movieId]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (cast.length === 0) return <p>No cast information available.</p>;

  return (
    <div className={css.castContainer}>
      <h2>Cast</h2>
      <ul className={css.castList}>
        {cast.map(actor => (
          <li key={actor.id} className={css.castItem}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
              }
              alt={actor.name}
            />
            <p>{actor.name}</p>
            <p className={css.character}>as {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
