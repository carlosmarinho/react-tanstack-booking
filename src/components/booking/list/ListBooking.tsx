import { useQuery } from '@tanstack/react-query';
import { sendApiRequest } from '../../../helpers/sendApiRequest';
import { List, Spin } from 'antd';
import { Ibooking } from '../IBooking';

const ListBooking = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['booking'],
    queryFn: async () => {
      return await sendApiRequest<Ibooking[]>(
        '/bookings',
        'GET',
      );
    },
  });

  return (
    <>
      {isLoading && (
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      )}
      <h2>Booking List</h2>
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={item.location}
              description={`From: ${item.startAt} To: ${item.endAt}`}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default ListBooking;
