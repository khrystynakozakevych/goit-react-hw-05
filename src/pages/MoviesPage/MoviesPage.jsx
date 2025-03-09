import { useState } from 'react';
import { searchMovies } from '../../assets/tmdb-api';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async e => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Please enter a movie name');
      return;
    }

    try {
      setError(null);
      const moviesData = await searchMovies(query);
      setMovies(moviesData);
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
      console.error('Error fetching movies:', err);
    }
  };

  return (
    <main className={css.movies_page_container}>
      <h2>Search Movies</h2>
      <form className={css.search_form} onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for a movie"
        />
        <button type="submit">Search</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <MovieList movies={movies} />
    </main>
  );
};

export default MoviesPage;
