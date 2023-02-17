import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import './App.scss';

export const App: React.FC = () => {
  return (
    <div className="App">
      <header className="header">
        <p>Currency rate for today</p>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <Link
          to="https://github.com/dmytro-lebedchenko"
          className="footer__link"
          target="_blank"
          rel="noreferrer"
        >
          My Github
        </Link>
      </footer>
    </div>
  );
}
