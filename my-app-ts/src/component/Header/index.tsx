import './style.css';
import { useAuthContext } from '../../feature/auth/provider/AuthProvider';
import { FirebaseError } from '@firebase/util';
import { getAuth, signOut } from 'firebase/auth';

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
      <div className="container">
        {user ? (
            <>
              <h1 className="heading">
                {user.displayName || user.email || '匿名ユーザー'}
              </h1>
              <button className="button" onClick={handleSignOut}>
                サインアウト
              </button>
            </>
          ) : (
            <h1 className="heading">ログアウト中</h1>
          )}
      </div>
    </header>
  );
};

export default Header;

