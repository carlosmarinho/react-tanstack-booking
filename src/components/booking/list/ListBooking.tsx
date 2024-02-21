import { useQuery } from '@tanstack/react-query';
import { sendApiRequest } from '../../../helpers/sendApiRequest';
import {
  Alert,
  Button,
  List,
  Spin,
  Typography,
} from 'antd';
import { Ibooking } from '../IBooking';
import { getIMageFromData } from '../../../helpers/getImageFromData';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FC } from 'react';

const { Text } = Typography;

const RightList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const StyledButton = styled(Button)`
  margin-bottom: 10px;
  width: 100%;
`;

const StyledLink = styled(Link)`
width: 100%;
}`;

interface IListBooking {
  isAdmin?: boolean;
}

const StatusButtonBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  button {
    min-width: 80px;
  }
`;

/**
 * @todo we need to implement the login to show admin data, at the moment we keep with
 * passing the props from website or admin
 */
const ListBooking: FC<IListBooking> = ({
  isAdmin = false,
}) => {
  const { isLoading, data } = useQuery({
    queryKey: ['booking'],
    queryFn: async () => {
      return await sendApiRequest<Ibooking[]>(
        '/bookings?populate[location][populate][0]=featuredImage&populate[room][populate][0]=featuredImage',
        'GET',
      );
    },
  });

  console.log('\n\n***\n daaaaaata: ', data, '\n***\n');

  const showStatusMessage = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <>
            <Alert
              type="warning"
              message="Waiting for confirmation"
            />
            <br />
            <StatusButtonBar>
              <Button danger>Delete!</Button>
              <Button>Edit!</Button>
            </StatusButtonBar>
          </>
        );
      case 'confirmed':
        return (
          <>
            <Alert
              type="warning"
              message="Confirmed and waiting Payment"
            />
            <br />
            <Button>Pay it!</Button>
          </>
        );
      case 'paid':
        return (
          <Alert
            type="warning"
            message="Your booking is Confirmed and Paid"
          />
        );
      default:
        return (
          <Alert
            type="success"
            message="Confirmed & Paid"
          />
        );
    }
  };

  return (
    <>
      {isLoading && (
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      )}
      <h2>Booking List</h2>
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
                  alt={`Location: ${item.location.data?.name}`}
                  src={
                    item.location.data?.featuredImage
                      ? getIMageFromData(
                          item.location.data?.featuredImage
                            .data,
                        )
                      : '/location-default.jpg'
                  }
                />
              }
              title={
                <>
                  {item.location.data?.type} -{' '}
                  {item.location.data?.name}
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
                    {/**
                     * @todo remove seconds from checkin and checkout
                     */}
                    <Text strong>Check In: </Text>
                    <Text>
                      {dayjs(item.startAt).format(
                        'MM/DD/YYYY',
                      )}{' '}
                      {item.location.data?.checkIn}
                    </Text>
                  </div>
                  <div>
                    <Text strong>Check Out: </Text>
                    <Text>
                      {dayjs(item.endAt).format(
                        'MM/DD/YYYY',
                      )}{' '}
                      {item.location.data?.checkOut}
                    </Text>
                  </div>
                </>
              }
            />
            <RightList>
              {isAdmin ? (
                <>
                  <StyledButton type="primary">
                    Confirm Booking
                  </StyledButton>
                  <StyledLink
                    to={`/admin/booking/edit/${item.id}`}
                  >
                    <StyledButton>
                      Edit Booking
                    </StyledButton>
                  </StyledLink>
                  <StyledButton danger>
                    Remove Booking
                  </StyledButton>
                </>
              ) : (
                showStatusMessage(item.status)
              )}
            </RightList>
          </List.Item>
        )}
      />
    </>
  );
};

export default ListBooking;
