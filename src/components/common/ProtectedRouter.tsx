import { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth';
import { useNavigate } from 'react-router-dom';

export const ProtectedRoute = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const { isLogged } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate('/', { replace: true });
    }
  }, [isLogged]);

  return children;
};

export default ProtectedRoute;
