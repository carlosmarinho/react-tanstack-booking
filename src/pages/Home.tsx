import CreateBooking from '../components/booking/create/CreateBooking';
import ListBooking from '../components/booking/list/ListBooking';

const HomePage = () => {
  return (
    <>
      <h1>HostFully Booking</h1>
      <CreateBooking />
      <ListBooking />
    </>
  );
};

export default HomePage;
