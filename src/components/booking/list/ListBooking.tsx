import { useQuery } from '@tanstack/react-query';
import { sendApiRequest } from '../../../helpers/sendApiRequest';
import { List, Spin, Typography } from 'antd';
import { Ibooking } from '../IBooking';
import { getIMageFromData } from '../../../helpers/getImageFromData';
import dayjs from 'dayjs';
import styled from 'styled-components';

const { Text } = Typography;

const RightList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const ListBooking = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['booking'],
    queryFn: async () => {
      return await sendApiRequest<Ibooking[]>(
        '/bookings?populate[location][populate][0]=featuredImage&populate[room][populate][0]=featuredImage',
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
      {/* <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={item.location}
              description={`From: ${item.startAt} To: ${item.endAt}`}
            />
          </List.Item>  
        )}
      /> */}
      <List
        pagination={{ position: 'bottom', align: 'center' }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              avatar={
                <img
                  width={200}
                  height={200}
                  alt={`Location: ${item.location.data.name}`}
                  src={
                    item.location.data.featuredImage
                      ? getIMageFromData(
                          item.location.data.featuredImage
                            .data,
                        )
                      : '/location-default.jpg'
                  }
                />
              }
              title={
                <>
                  {item.location.data.type} -{' '}
                  {item.location.data.name}
                </>
              }
              description={
                <>
                  <div>
                    <Text strong>Status: </Text>
                    <Text>{item.status}</Text>
                  </div>
                  <div>
                    <Text strong>Customer: </Text>
                    <Text>
                      {
                        item.user_permission_user?.data
                          .username
                      }
                    </Text>
                  </div>
                  <div>
                    <Text strong>Room: </Text>
                    <Text>{item.room?.data?.name}</Text>
                  </div>

                  <div>
                    <Text strong>Guests: </Text>
                    <Text>{item.totalGuests}</Text>
                  </div>
                  <div>
                    <Text strong>Nights: </Text>
                    <Text>{item.nights}</Text>
                  </div>
                  <div>
                    <Text strong>Total Reserve US$: </Text>
                    <Text>{item.totalValue}</Text>
                  </div>
                  <div>
                    <Text strong>Check In: </Text>
                    <Text>
                      {dayjs(item.startAt).format(
                        'MM/DD/YYYY',
                      )}{' '}
                      {item.location.data.checkIn}
                    </Text>
                  </div>
                  <div>
                    <Text strong>Check Out: </Text>
                    <Text>
                      {dayjs(item.endAt).format(
                        'MM/DD/YYYY',
                      )}{' '}
                      {item.location.data.checkOut}
                    </Text>
                  </div>
                </>
              }
            />
            <RightList>
              {/**
               * @todo remove seconds from checkin and checkout
               */}
            </RightList>
          </List.Item>
        )}
      />
    </>
  );
};

export default ListBooking;
