import { useQuery } from '@tanstack/react-query';
import { sendApiRequest } from '../../../helpers/sendApiRequest';
import {
  Button,
  Divider,
  List,
  Spin,
  Typography,
} from 'antd';
import { ILocation } from '../../location/ILocation';
import { getIMageFromData } from '../../../helpers/getImageFromData';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ActionItems from './ActionItems';
import RightCard from './RightCard';

const { Paragraph, Text } = Typography;

const ResultsWrapper = styled.div`
  h3 {
    margin-top: 0;
  }

  h4 {
    margin: 10px 0;
  }

  li.ant-list-item {
    margin-bottom: 20px;
    border: 1px solid #cecece;
  }

  .ant-list-vertical .ant-list-item .ant-list-item-action {
    justify-content: center;
    display: flex;
    margin-block-start: 0px;
  }

  .ant-divider {
    margin: 20px 0;
  }
`;

const RoomWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const RoomImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 20px;

  img {
    margin-right: 20px;
  }

  h5 {
    margin: 0 0 10px 0;
  }

  .ant-typography {
    margin-bottom: 0;
  }
`;

const ButtonBar = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 20px;

  .ant-typography {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
`;

const SearchResult = () => {
  const ellipsis = true;
  const { isLoading, data: locations } = useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      return await sendApiRequest<ILocation[]>(
        '/locations?populate=*',
        'GET',
      );
    },
  });

  return (
    <ResultsWrapper>
      <h2>Search Results</h2>
      {isLoading && (
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      )}
      {locations && (
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 5,
          }}
          dataSource={locations}
          renderItem={({
            id,
            name,
            description,
            city,
            rating,
            rooms,
            featuredImage,
          }) => {
            return (
              <List.Item
                key={id}
                actions={ActionItems}
                extra={
                  <RightCard
                    name={city?.data.name}
                    rating={rating}
                    image={featuredImage?.data}
                  />
                }
              >
                <h3>
                  <Link to={`/location/${id}`}>{name}</Link>
                </h3>
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
                  {description}
                </Paragraph>

                <RoomWrapper>
                  {rooms?.data.map((room) => {
                    return (
                      <>
                        <RoomImageWrapper>
                          <img
                            width={60}
                            height={60}
                            alt={`Room: ${room.name}`}
                            src={
                              room.featureImage
                                ? getIMageFromData(
                                    room.featureImage?.data,
                                  )
                                : '/bed.png'
                            }
                          />
                          <div>
                            <h4>
                              {room.name} ( {room.guests}{' '}
                              Max Guests )
                            </h4>
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
                              {room.description}
                            </Paragraph>
                          </div>
                        </RoomImageWrapper>
                        <ButtonBar>
                          <Text>1 night</Text>
                          <Text strong>${room.rate}</Text>
                          <Link to={`/reserve/${room.id}`}>
                            <Button danger>Reserve</Button>
                          </Link>
                        </ButtonBar>
                        <Divider />
                      </>
                    );
                  })}
                </RoomWrapper>
              </List.Item>
            );
          }}
        />
      )}
    </ResultsWrapper>
  );
};

export default SearchResult;
