import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store';

export const useLogout = () => {
  const { setRole, setSid } = useAuthStore();
  const navigate = useNavigate();
  const logout = () => {
    setRole('');
    setSid('');
    navigate('/login');
  };

  return logout;
};
