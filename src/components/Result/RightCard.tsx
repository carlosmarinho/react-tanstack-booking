import { StarTwoTone } from '@ant-design/icons';
import { Typography } from 'antd';
import { getIMageFromData } from '../../helpers/getImageFromData';
import styled from 'styled-components';
import { FC } from 'react';
import { IImage } from '../location/ILocation';

const { Text } = Typography;

const FeaturedHotel = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopIMage = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface IRightCard {
  name?: string;
  rating: number;
  image: IImage;
}

const RightCard: FC<IRightCard> = ({
  name,
  rating,
  image,
}) => {
  return (
    <FeaturedHotel>
      <TopIMage>
        <Text>{name}</Text>
        <div>
          {[...Array(rating)].map((rate) => (
            <StarTwoTone key={rate} twoToneColor="yellow" />
          ))}
        </div>
      </TopIMage>
      <img
        width={300}
        alt="logo"
        src={getIMageFromData(image)}
      />
    </FeaturedHotel>
  );
};

export default RightCard;
