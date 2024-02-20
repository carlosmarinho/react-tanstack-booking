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
import {
  adultsArray,
  childrenArray,
  device,
} from '../../utils';
import styled from 'styled-components';
import { FC, useEffect, useState } from 'react';

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
  min-width: 200px;
  width: 100%;
  &.ant-btn-primary:disabled {
    background-color: #d9d9d9;
    color: #ffffff;
  }

  @media ${device.tablet} {
    min-width: initial;
    width: 12%;
  }

  @media ${device.laptop} {
    height: 40px;
  }
`;

export interface ISearchBar {
  onSearch?: (values: any) => void;
}

const SearchBar: FC<ISearchBar> = ({ onSearch }) => {
  const [form] = Form.useForm();
  const [submittable, setSubmittable] = useState(false);

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

  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      },
    );
  }, [values]);

  return (
    <FormWrapper
      form={form}
      className="search-bar-container"
      onFinish={onSearch}
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
          placeholder="Select your Check-In"
          disabledDate={(d) => !d || d.isBefore(new Date())}
        />
      </ItemWrapper>
      <ItemWrapper
        name="endAt"
        rules={[{ required: true }]}
      >
        <StyledDatePicker
          placeholder="Select your Check-Out"
          disabledDate={(d) =>
            !d ||
            d.isBefore(new Date()) ||
            d.isBefore(values.startAt.add(1, 'day'))
          }
        />
      </ItemWrapper>
      <ItemWrapper name="adult">
        <StyledSelect
          placeholder="Quantity Adult"
          options={adultsArray?.map((person) => ({
            value: person,
            label: person,
          }))}
        />
      </ItemWrapper>
      <ItemWrapper name="children">
        <StyledSelect
          placeholder="Quantity Children"
          options={childrenArray?.map((person) => ({
            value: person,
            label: person,
          }))}
        />
      </ItemWrapper>
      <StyledButton
        type="primary"
        htmlType="submit"
        disabled={!submittable}
      >
        Search
      </StyledButton>
    </FormWrapper>
  );
};

export default SearchBar;
