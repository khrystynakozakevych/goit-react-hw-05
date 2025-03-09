import { Link } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  return (
    <div className={css.list}>
      {movies.map(({ id, poster_path, title }) => (
        <div key={id} className={css.movie}>
          <Link to={`/movies/${id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
              loading="lazy"
            />
            <h3>{title}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
