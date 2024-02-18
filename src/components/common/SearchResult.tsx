import { useQuery } from '@tanstack/react-query';
import { IRoom } from '../rooms/IRoom';
import { sendApiRequest } from '../../helpers/sendApiRequest';

import {
  LikeOutlined,
  MessageOutlined,
  StarTwoTone,
  HeartOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
import {
  Avatar,
  List,
  Space,
  Spin,
  Typography,
} from 'antd';
import { ILocation } from '../location/ILocation';
import { getIMageFromData } from '../../helpers/getImageFromData';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const { Paragraph, Text } = Typography;

const FeaturedHotel = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopIMage = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IconText = ({
  icon,
  text,
}: {
  icon: React.FC;
  text: string;
}) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const SearchResult = () => {
  const [ellipsis, setEllipsis] = useState(true);
  const { isLoading, data: locations } = useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      return await sendApiRequest<ILocation[]>(
        '/locations?populate=*',
        'GET',
      );
    },
  });

  console.log('\n\n***\n rooms: ', locations, '\n***\n');

  return (
    <>
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
          renderItem={(item) => {
            return (
              <List.Item
                key={item.id}
                actions={[
                  <IconText
                    icon={HeartOutlined}
                    text="156"
                    key="list-vertical-heart-o"
                  />,
                  <IconText
                    icon={LikeOutlined}
                    text="156"
                    key="list-vertical-like-o"
                  />,
                  <IconText
                    icon={MessageOutlined}
                    text="2"
                    key="list-vertical-message"
                  />,
                ]}
                extra={
                  <FeaturedHotel>
                    <TopIMage>
                      <Text>{item.city?.data.name}</Text>
                      <div>
                        {[...Array(item.rating)].map(
                          (rate) => (
                            <StarTwoTone
                              key={rate}
                              twoToneColor="yellow"
                            />
                          ),
                        )}
                      </div>
                    </TopIMage>
                    <img
                      width={300}
                      alt="logo"
                      src={getIMageFromData(
                        item?.featuredImage.data,
                      )}
                    />
                  </FeaturedHotel>
                }
              >
                <List.Item.Meta
                  // avatar={<Avatar src={item.avatar} />}
                  title={
                    <Link to={`/location/${item.id}`}>
                      {item.name}
                    </Link>
                  }
                  description={
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
                      {item.description}
                    </Paragraph>
                  }
                />
                <h5>Rooms</h5>

                {item.description}
              </List.Item>
            );
          }}
        />
      )}
    </>
  );
};

export default SearchResult;
