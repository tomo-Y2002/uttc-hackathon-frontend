// index.tsx
import { FormEvent, useState } from "react";
import './style.css'; // CSSファイルをインポート
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from 'firebase/auth'
import { FirebaseError } from 'firebase/app'

export const Signup = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      await sendEmailVerification(userCredential.user)
      setEmail('')
      setPassword('')
      alert('確認メールを送信しました。メールを確認してください。')
    } catch (e) {
      if (e instanceof FirebaseError) {
        // ここでFirebaseのエラーコードに基づいたメッセージを表示できます
        alert(e.message)
        console.log(e)
      }
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="container">
      <h1>サインアップ</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <label>メールアドレス</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>パスワード</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="submit-group">
          <button type="submit" disabled={isLoading}>
            {isLoading ? '読み込み中...' : 'アカウントを作成'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
