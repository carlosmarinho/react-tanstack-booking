import { useQuery } from '@tanstack/react-query';
import {
  Button,
  DatePicker,
  Form,
  Select,
  Spin,
} from 'antd';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ICity } from '../city/ICity';
import { device } from '../../utils';
import styled from 'styled-components';

const { Item } = Form;

const FormWrapper = styled(Form)`
  @media ${device.tablet} {
    display: flex;
    margin-top: 60px;
  }

  @media ${device.laptop} {
    margin-top: 30px;
  }
`;

const ItemWrapper = styled(Item)`
  margin-bottom: 12px;
  min-width: 200px;

  @media ${device.mobileM} {
    margin-bottom: 14px;
  }

  @media ${device.tablet} {
    margin-bottom: 16px;
    min-width: 75px;
    // width: 10%;
    margin-right: 15px;
  }

  @media ${device.laptop} {
    width: 22%;
    height: 40px;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  min-width: 200px;
  width: 100%;

  @media ${device.tablet} {
    min-width: 75px;
  }

  @media ${device.laptop} {
    height: 40px;
  }
`;

const StyledSelect = styled(Select)`
  @media ${device.laptop} {
    height: 40px;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  @media ${device.tablet} {
    width: 12%;
    height: 40px;
  }

  @media ${device.tablet} {
    width: 12%;
    height: 40px;
  }
`;

const persons = [1, 2, 3, 4, 5];

const SearchBar = () => {
  const [form] = Form.useForm();

  const { isLoading: loadingCities, data: cities } =
    useQuery({
      queryKey: ['cities'],
      queryFn: async () => {
        return await sendApiRequest<ICity[]>(
          '/cities',
          'GET',
        );
      },
    });

  return (
    <FormWrapper
      form={form}
      className="search-bar-container"
    >
      {loadingCities ? (
        <Spin tip="Loading" size="small">
          <div className="content" />
        </Spin>
      ) : (
        <ItemWrapper
          name="city"
          rules={[{ required: true }]}
        >
          {/** @todo select is not working with styled compoents, and I'll need to use css */}
          <StyledSelect
            placeholder="Select your destiny"
            options={cities?.map((city) => ({
              value: city.id,
              label: city.name,
            }))}
          />
        </ItemWrapper>
      )}

      <ItemWrapper
        name="startAt"
        rules={[{ required: true }]}
      >
        <StyledDatePicker
          showTime
          placeholder="Select your Check-In"
        />
      </ItemWrapper>
      <ItemWrapper
        name="endAt"
        rules={[{ required: true }]}
      >
        <StyledDatePicker
          showTime
          placeholder="Select your Check-Out"
        />
      </ItemWrapper>
      <ItemWrapper name="adult">
        <StyledSelect
          placeholder="Quantity Adult"
          options={persons?.map((person) => ({
            value: person,
            label: person,
          }))}
        />
      </ItemWrapper>
      <ItemWrapper name="children">
        <StyledSelect
          placeholder="Quantity Children"
          options={persons?.map((person) => ({
            value: person,
            label: person,
          }))}
        />
      </ItemWrapper>
      <StyledButton type="primary">Search</StyledButton>
    </FormWrapper>
  );
};

export default SearchBar;
