import { FC, createContext, useState } from 'react';
import { IUser } from '../components/user/IUser';

const defaultUser = {
  id: 0,
  username: '',
  email: '',
  blocked: false,
  confirmed: false,
};

interface IAuth {
  authTokens: IUser;
  setTokens: (user: IUser) => void;
  isLogged: boolean;
  logout: () => void;
}

const AuthContext = createContext<IAuth>({
  authTokens: defaultUser,
  setTokens: () => {},
  isLogged: false,
  logout: () => {},
});

const AuthProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authTokens, setAuthTokens] =
    useState<IUser>(defaultUser);

  const [isLogged, setIsLogged] = useState(false);

  const setTokens = (user: IUser) => {
    localStorage.setItem('tokens', JSON.stringify(user));
    setAuthTokens(user);
    setIsLogged(true);
  };

  const logout = () => {
    localStorage.removeItem('tokens');
    setIsLogged(false);
  };

  const valuesToShare = {
    authTokens,
    setTokens,
    isLogged,
    logout,
  };

  return (
    <AuthContext.Provider value={valuesToShare}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
