import CreateBooking from '../../components/booking/create/CreateBooking';
import ListBooking from '../../components/booking/list/ListBooking';

const HomePageAdmin = () => {
  return (
    <>
      <h1>HostFully Booking Administrator</h1>
      <CreateBooking />
      <ListBooking />
    </>
  );
};

export default HomePageAdmin;
