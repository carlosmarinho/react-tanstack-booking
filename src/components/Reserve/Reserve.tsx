import { useQuery } from '@tanstack/react-query';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { IRoom } from '../room/IRoom';
import {
  Alert,
  Button,
  Card,
  DatePicker,
  // DatePickerProps,
  Select,
  Spin,
  Typography,
} from 'antd';
import { useParams } from 'react-router-dom';
import { getIMageFromData } from '../../helpers/getImageFromData';
import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
// import dayjs, { Dayjs } from 'dayjs';
import { adultsArray, childrenArray } from '../../utils';
import AuthContext from '../../context/auth';
import { useReserve } from '../../hooks/useReserve';

const { Paragraph, Text } = Typography;

const StyledCard = styled(Card)`
  .ant-card-cover img {
    max-height: 300px;
  }
`;

const RoomWrapper = styled.div`
  display: flex;
  img {
    width: 200px;
  }
`;

const ListRooms = styled.ul`
  li {
    margin-bottom: 10px;
  }
`;

const LabelChildren = styled(Text)`
  margin-left: 40px;
`;

const LabelTo = styled(Text)`
  margin-left: 50px;
`;

const Reserve = () => {
  const { isLogged } = useContext(AuthContext);

  const ellipsis = true;
  const [totalValue, setTotalValue] = useState(0);

  const {
    roomId,
    checkIn: strCheckIn,
    checkOut: strCheckOut,
    adults: strAdults = '0',
    children: strChildren = '0',
  } = useParams();

  const {
    isPending,
    isSuccess,
    warningMessage,
    successMessage,
    setCheckIn,
    setCheckOut,
    checkIn,
    checkOut,
    night,
    doReservation,
  } = useReserve({ roomId, strCheckIn, strCheckOut });

  const [totalGuests, setTotalGuests] = useState(
    parseInt(strAdults) + parseInt(strChildren),
  );

  const [adults, setAdults] = useState(strAdults);
  const [children, setChildren] = useState(strChildren);

  const { isLoading, data: room } = useQuery({
    queryKey: ['room', roomId],
    queryFn: async () => {
      return await sendApiRequest<IRoom>(
        `/rooms/${roomId}?populate[location][populate][0]=featuredImage`,
        'GET',
      );
    },
  });

  const handleChangeAdult = (value: string) => {
    setAdults(value);
  };

  const handleChangeChildren = (value: string) => {
    setChildren(value);
  };

  useEffect(() => {
    if (adults && room?.rate) {
      setTotalGuests(parseInt(adults) + parseInt(children));

      setTotalValue(room.rate ? room.rate * night : 0);
    }
  }, [adults, children]);

  const canReserve = () => {
    return (
      night > 0 &&
      totalGuests > 0 &&
      room?.guests &&
      totalGuests <= room.guests &&
      totalValue > 0 &&
      !isSuccess
    );
  };

  const { data: location } = room?.location || {};

  return (
    <>
      <h2>Reserve</h2>
      {(isPending || isLoading) && (
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      )}
      {location && (
        <StyledCard
          cover={
            <img
              alt={`Location ${location.name}`}
              src={
                location.featuredImage.data
                  ? getIMageFromData(
                      location.featuredImage.data,
                    )
                  : '/location-default.jpg'
              }
            />
          }
          actions={[
            <Button
              danger
              key="reserva"
              disabled={!canReserve() || isPending}
              onClick={() =>
                doReservation({
                  room,
                  totalValue,
                  adults: parseInt(adults),
                  children: parseInt(children),
                })
              }
            >
              {isPending && <Spin size="small" />}
              Confirm Reservation
            </Button>,
          ]}
        >
          {!isLogged && warningMessage && (
            <Alert
              message={warningMessage}
              type="warning"
            />
          )}

          {isLogged && successMessage && (
            <Alert
              message={successMessage}
              type="success"
            />
          )}
          <h3>{location.name}</h3>
          <Paragraph
            ellipsis={
              ellipsis
                ? {
                    rows: 2,
                    expandable: true,
                    symbol: 'more',
                  }
                : false
            }
          >
            {location.description}
          </Paragraph>
          <h4>
            Room to Reserve: {room?.name} ( {room?.guests}{' '}
            Max Guests )
          </h4>
          <RoomWrapper>
            <img
              src={
                room?.featureImage
                  ? getIMageFromData(
                      room.featureImage?.data,
                    )
                  : '/bed.png'
              }
              alt={`Room image: ${room?.name}`}
            />
            <ListRooms>
              <li>
                From:{' '}
                <DatePicker
                  defaultValue={checkIn}
                  onChange={setCheckIn}
                  disabledDate={(d) =>
                    !d || d.isBefore(new Date())
                  }
                  placeholder="Select your Check-In"
                />
                <LabelTo>To: </LabelTo>
                <DatePicker
                  defaultValue={checkOut}
                  onChange={setCheckOut}
                  disabledDate={(d) =>
                    !d ||
                    d.isBefore(new Date()) ||
                    d.isBefore(checkIn?.add(1, 'day'))
                  }
                  placeholder="Select your Check-Out"
                />
              </li>
              <li>
                Adults:
                <Select
                  defaultValue={adults}
                  onChange={handleChangeAdult}
                  placeholder="Quantity Adult"
                  options={adultsArray?.map((person) => ({
                    value: person,
                    label: person,
                  }))}
                />
                <LabelChildren>Children: </LabelChildren>
                <Select
                  defaultValue={children}
                  onChange={handleChangeChildren}
                  placeholder="Quantity Adult"
                  options={childrenArray?.map((person) => ({
                    value: person,
                    label: person,
                  }))}
                />
              </li>
              <li>Total Guests: {totalGuests}</li>
              <li>
                Price for 1 Night at this room: $
                {room?.rate}
              </li>
              <li>Total Nights selected: {night}</li>
              <li>
                <strong>
                  Total Reservation: ${totalValue}
                </strong>
              </li>
            </ListRooms>
          </RoomWrapper>
        </StyledCard>
      )}
    </>
  );
};

export default Reserve;
