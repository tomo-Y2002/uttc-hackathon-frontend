// Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSSのインポート

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Home</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/blog">ブログ</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/book">技術書</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/video">動画</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">SignUp</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signin">SignIn</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

