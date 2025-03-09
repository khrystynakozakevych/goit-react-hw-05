import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../assets/tmdb-api';
import MovieList from '../../components/MovieList/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const moviesData = await getTrendingMovies();
        setMovies(moviesData);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div>
      <h1>Popular Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
