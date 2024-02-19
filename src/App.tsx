import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import HomePage from './pages/Home';
import ReservePage from './pages/Reserve';
import HomePageAdmin from './pages/admin/Home';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/reserve/:roomId"
            element={<ReservePage />}
          />
          <Route
            path="/admin/"
            element={<HomePageAdmin />}
          />
        </Routes>
      </Router>
      {/* <HomePage /> */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
