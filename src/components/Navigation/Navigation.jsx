import { Link } from 'react-router-dom';
import css from './Navigation.module.css';

const Navigation = () => (
  <header className={css.header}>
    <nav>
      <ul className={css.navList}>
        <li>
          <Link to="/" className={css.navItem}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/movies" className={css.navItem}>
            Movies
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Navigation;
