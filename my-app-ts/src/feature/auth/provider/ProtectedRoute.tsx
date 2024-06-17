// src/components/auth/ProtectedRoute.tsx
import { useAuthContext } from './AuthProvider';
import { Navigate } from 'react-router-dom'; 

type Props = { children: JSX.Element }

export const ProtectedRoute = ({ children }: Props) => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/signin" />;
    // return null;
  }

  // ユーザーがログインしている場合は、子コンポーネントを描画する
  return children;
};

// export default ProtectedRoute;