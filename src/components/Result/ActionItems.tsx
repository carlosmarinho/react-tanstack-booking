import { FC, createElement } from 'react';
import {
  LikeOutlined,
  MessageOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import { Space } from 'antd';

const IconText = ({
  icon,
  text,
}: {
  icon: FC;
  text: string;
}) => (
  <Space>
    {createElement(icon)}
    {text}
  </Space>
);

const ActionItems = [
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
];

export default ActionItems;
