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
import { AuthProvider } from './context/auth';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/common/ProtectedRouter';
import BookingCreateAdmin from './pages/admin/booking/BookingCreate';
import BookingListAdmin from './pages/admin/booking/BookingLis';
import BookingEditAdmin from './pages/admin/booking/BookingEdit';
import MyBookings from './pages/MyBookings';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/reserve/:roomId/:checkIn?/:checkOut?/:adults?/:children?"
              element={<ReservePage />}
            />
            <Route
              path="/my-bookings"
              element={
                <ProtectedRoute>
                  <MyBookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/"
              element={
                <ProtectedRoute>
                  <HomePageAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/booking/create"
              element={
                <ProtectedRoute>
                  <BookingCreateAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/booking/edit/:bookingId"
              element={
                <ProtectedRoute>
                  <BookingEditAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/booking/list"
              element={
                <ProtectedRoute>
                  <BookingListAdmin />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
