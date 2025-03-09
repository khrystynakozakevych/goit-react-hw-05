import { useState } from 'react';
import { searchMovies } from '../../assets/tmdb-api';
import MovieList from '../../components/MovieList/MovieList';

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
    <div>
      <h2>search</h2>
      <form onSubmit={handleSearch}>
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
    </div>
  );
};

export default MoviesPage;
