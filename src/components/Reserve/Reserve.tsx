import { useQuery } from '@tanstack/react-query';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { IRoom } from '../room/IRoom';
import {
  Button,
  Card,
  DatePicker,
  DatePickerProps,
  Select,
  Spin,
  Typography,
} from 'antd';
import { useParams } from 'react-router-dom';
import { getIMageFromData } from '../../helpers/getImageFromData';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { adultsArray, childrenArray } from '../../utils';

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
  const {
    roomId,
    checkIn: strCheckIn,
    checkOut: strCheckOut,
    adults: strAdults = '0',
    children: strChildren = '0',
  } = useParams();
  const ellipsis = true;
  const [night, setNight] = useState(0);
  const [totalGuests, setTotalGuests] = useState(
    parseInt(strAdults) + parseInt(strChildren),
  );
  const [checkIn, setCheckIn] = useState<Dayjs | null>(
    strCheckIn ? dayjs(strCheckIn) : null,
  );
  const [checkOut, setCheckOut] = useState<Dayjs | null>(
    strCheckOut ? dayjs(strCheckOut) : null,
  );
  const [adults, setAdults] = useState(strAdults);
  const [children, setChildren] = useState(strChildren);

  const handleCheckIn: DatePickerProps['onChange'] = (
    date,
  ) => {
    setCheckIn(date);
  };

  const handleCheckOut: DatePickerProps['onChange'] = (
    date,
  ) => {
    setCheckOut(date);
  };

  const handleChangeAdult = (value: string) => {
    setAdults(value);
  };

  const handleChangeChildren = (value: string) => {
    setChildren(value);
  };

  useEffect(() => {
    if (checkIn && checkOut) {
      const hours = checkOut.diff(checkIn, 'hours');
      const days = Math.floor(hours / 24);
      setNight(days);
    }
  }, [checkIn, checkOut]);

  useEffect(() => {
    if (adults) {
      setTotalGuests(parseInt(adults) + parseInt(children));
    }
  }, [adults, children]);

  const canReserve = () => {
    return (
      night > 0 &&
      totalGuests > 0 &&
      room?.guests &&
      totalGuests <= room.guests
    );
  };

  const { isLoading, data: room } = useQuery({
    queryKey: ['room'],
    queryFn: async () => {
      return await sendApiRequest<IRoom>(
        `/rooms/${roomId}?populate[location][populate][0]=featuredImage`,
        'GET',
      );
    },
  });

  const { data: location } = room?.location || {};

  return (
    <>
      <h2>Reserve</h2>
      {isLoading && (
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
              disabled={!canReserve()}
            >
              Confirm Reservation
            </Button>,
          ]}
        >
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
                  onChange={handleCheckIn}
                  disabledDate={(d) =>
                    !d || d.isBefore(new Date())
                  }
                  placeholder="Select your Check-In"
                />
                <LabelTo>To: </LabelTo>
                <DatePicker
                  defaultValue={checkOut}
                  onChange={handleCheckOut}
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
                  Total Reservation: $
                  {room?.rate ? room.rate * night : '0'}
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
