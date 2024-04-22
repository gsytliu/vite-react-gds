import { useGetAccess } from '@/hooks';
import { Navigate } from 'react-router-dom';

type AccessControlProps = {
  children: React.ReactElement;
  access: string | string[] | any;
};

const AccessControl: React.FC<AccessControlProps> = ({
  children,
  access = true,
}) => {
  const { getAccess } = useGetAccess();
  return getAccess(access) ? children : <Navigate to='/' />;
};

export default AccessControl;
