import { useQuery } from '@tanstack/react-query';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { IRoom } from '../room/IRoom';
import {
  Avatar,
  Button,
  Card,
  Spin,
  Typography,
} from 'antd';
import { useParams } from 'react-router-dom';
import { getIMageFromData } from '../../helpers/getImageFromData';
import styled from 'styled-components';
import { useState } from 'react';

const StyledCard = styled(Card)`
  .ant-card-cover img {
    max-height: 300px;
  }
`;

const RoomWrapper = styled.div`
  display: flex;
  img {
    width: 120px;
  }
`;

const { Paragraph, Text } = Typography;
const { Meta } = Card;

const Reserve = () => {
  const { roomId } = useParams();
  const [ellipsis, setEllipsis] = useState(true);
  const [night, setNight] = useState(0);

  const { isLoading, data: room } = useQuery({
    queryKey: ['room'],
    queryFn: async () => {
      return await sendApiRequest<IRoom>(
        // `/rooms?filters[id][$eq]=${roomId}&populate[location][populate][0]=featuredImage`,
        `/rooms/${roomId}?populate[location][populate][0]=featuredImage`,
        'GET',
      );
    },
  });

  const { data: location } = room?.location || {};

  console.log(
    '\n\n***\n room: ',
    room,
    room?.location,
    '\n***\n',
  );

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
              src={getIMageFromData(
                location.featuredImage.data,
              )}
            />
          }
          actions={[
            <Button danger key="reserva">
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
          <h4>Room to Reserve: {room?.name}</h4>
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
            <ul>
              <li>From: To: </li>
              <li>Total Nights: {night}</li>
              <li>1 Night: ${room?.rate}</li>
              <li>
                Total: $
                {room?.rate ? room.rate * night : '0'}
              </li>
            </ul>
          </RoomWrapper>
        </StyledCard>
      )}
    </>
  );
};

export default Reserve;
