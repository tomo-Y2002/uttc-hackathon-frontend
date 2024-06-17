import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from 'firebase/auth'
import { FirebaseError } from 'firebase/app'

interface UseSignUpReturn {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export const useSignUp = (): UseSignUpReturn => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

  return { email, setEmail, password, setPassword, isLoading, handleSubmit };
}