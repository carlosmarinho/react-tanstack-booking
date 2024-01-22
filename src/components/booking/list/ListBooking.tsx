import { useQuery } from '@tanstack/react-query';
import { sendApiRequest } from '../../../helpers/sendApiRequest';
import { List, Spin } from 'antd';
import { Ibooking } from '../IBooking';

const ListBooking = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['booking'],
    queryFn: async () => {
      return await sendApiRequest<Ibooking[]>(
        'https://65a48cf652f07a8b4a3d73c0.mockapi.io/booking',
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
              title={item.locationId}
              description={item.customerId}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default ListBooking;
