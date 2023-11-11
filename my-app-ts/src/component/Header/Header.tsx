import React from 'react';
import './Header.css'; // CSSファイルをインポート
import { useAuthContext } from '../../feature/auth/provider/AuthProvider';
import { FirebaseError } from '@firebase/util';
import { getAuth, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';

export const Header = () => {
  const { user } = useAuthContext();

  const handleSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.error(e);
      }
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="left-header-content">
          <Link to="/" className="nav-link">
            <h1 className="knowledge-base">Knowledge Base</h1>
          </Link>
        </div>
        <div className="page-link-wrapper">
          <Link className="nav-link" to="/">
            <div className="page-link">Home</div>
          </Link>
          <Link className="nav-link" to="/blog">
            <div className="page-link">ブログ</div>
          </Link>
          <Link className="nav-link" to="/book">
            <div className="page-link">技術書</div>
          </Link>
          <Link className="nav-link" to="/video">
            <div className="page-link">動画</div>
          </Link>
        </div>
        <div className="user-info">
          {user ? (
            <>
              <span className="user-name">
                {user.displayName || user.email || '匿名ユーザー'}
              </span>
              <button className="sign-out-button" onClick={handleSignOut}>
                サインアウト
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/signup">
                <div className="page-link">Signup</div>
              </Link>
              <Link className="nav-link" to="/signin">
                <div className="page-link">Signin</div>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
