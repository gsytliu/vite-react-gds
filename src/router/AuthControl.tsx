import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store';

const AuthControl: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { sid, role } = useAuthStore();
  if (!sid || !role) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

export default AuthControl;
