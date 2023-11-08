import { FormEvent, useState } from "react";
import "./style.css"; 
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      alert('ログインしました。'); 
      setEmail('');
      setPassword('');
      // TODO: ログイン後のページに遷移の処理を書く
    } catch (e) {
      alert('エラーが発生しました。'); 
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 >サインイン</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <label className="form-label">メールアドレス</label>
          <input
            className="input"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label className="form-label">パスワード</label>
          <input
            className="input"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="submit-group">
          <button className="button" type="submit" disabled={isLoading}>
            {isLoading ? '読み込み中...' : 'ログイン'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
