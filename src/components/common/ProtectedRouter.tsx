import { useContext } from 'react';
import AuthContext from '../../context/auth';
import { useNavigate } from 'react-router-dom';

export const ProtectedRoute = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const { isLogged } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isLogged) {
    navigate('/', { replace: true });
  }

  return children;
};

export default ProtectedRoute;
