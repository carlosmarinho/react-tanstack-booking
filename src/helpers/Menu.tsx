import { Link } from 'react-router-dom';

export const leftItems = [
  {
    key: 'hotels',
    label: <Link to="/hotels">Hotels</Link>,
  },
];

export const rightItems = (handleLogin: () => void) => [
  {
    key: 'register',
    label: <Link to="/register">Register</Link>,
  },
  {
    key: 'signin',
    label: (
      <a href="#" onClick={handleLogin}>
        Sign-In
      </a>
    ),
  },
];
