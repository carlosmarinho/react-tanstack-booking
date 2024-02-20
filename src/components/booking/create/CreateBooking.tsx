import {
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import {
  Alert,
  Button,
  DatePicker,
  Form,
  Select,
  Spin,
} from 'antd';
import {
  sendApiRequest,
  sendApiRequestforUser,
} from '../../../helpers/sendApiRequest';
import { ICreateBooking } from './ICreateBooking';
import { useEffect, useState } from 'react';
import { IUser } from '../../user/IUser';
import { ILocation } from '../../location/ILocation';
import { ICity } from '../../city/ICity';
import { IRoom } from '../../room/IRoom';
import { adultsArray, childrenArray } from '../../../utils';

const CreateBooking = () => {
  const [form] = Form.useForm();
  const [showSuccessMessage, setShowSuccessMessage] =
    useState(false);

  const values = Form.useWatch([], form);
  const { cityId, locationId } = values || {
    cityId: 0,
    locationId: 0,
  };

  const { isLoading: loadingCustomers, data: customers } =
    useQuery({
      queryKey: ['customer'],
      queryFn: async () => {
        return await sendApiRequestforUser<IUser[]>(
          '/users',
          'GET',
        );
      },
    });

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

  const { isLoading: loadingLocations, data: locations } =
    useQuery({
      queryKey: ['locations', cityId],
      queryFn: async () => {
        return await sendApiRequest<ILocation[]>(
          `/locations?populate=featuredImage,rooms&filters[city][id][$eq]=${values.cityId}`,
          'GET',
        );
      },
      enabled: !!cityId,
    });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: ICreateBooking) =>
      sendApiRequest('/bookings', 'POST', data),
  });

  console.log('\n\n***\n vales: ', locations, '\n***\n');

  useEffect(() => {
    if (isSuccess) {
      setShowSuccessMessage(true);
      form.resetFields();
    }

    const successTimeout = setTimeout(
      () => setShowSuccessMessage(false),
      3500,
    );

    return () => {
      clearTimeout(successTimeout);
    };
  }, [isSuccess]);

  const onFinish = (values: ICreateBooking) => {
    mutate(values);
    if (isSuccess) {
      form.resetFields();
    }
  };

  const [location] = locations || [{ rooms: { data: [] } }];

  return (
    <>
      {showSuccessMessage && (
        <Alert
          message="Booking created successfully!"
          type="success"
        />
      )}
      {isPending && (
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      )}
      <Form
        name="create-booking"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          name="cityId"
          label="City"
          rules={[{ required: true }]}
        >
          {loadingCities ? (
            <Spin tip="Loading" size="small">
              <div className="content" />
            </Spin>
          ) : (
            <Select
              options={cities?.map((city) => ({
                value: city.id,
                label: city.name,
              }))}
            />
          )}
        </Form.Item>
        {cityId && (
          <Form.Item
            name="locationId"
            label="Location"
            rules={[{ required: true }]}
          >
            {loadingLocations ? (
              <Spin tip="Loading" size="small">
                <div className="content" />
              </Spin>
            ) : (
              <Select
                options={locations?.map((location) => ({
                  value: location.id,
                  label: location.name,
                }))}
              />
            )}
          </Form.Item>
        )}
        {cityId && locationId && locations && (
          <Form.Item
            name="room"
            label="Room"
            rules={[{ required: true }]}
          >
            {loadingLocations ? (
              <Spin tip="Loading" size="small">
                <div className="content" />
              </Spin>
            ) : (
              <Select
                options={location.rooms?.data.map(
                  (room: IRoom) => ({
                    value: room.id,
                    label: room.name,
                  }),
                )}
              />
            )}
          </Form.Item>
        )}
        <Form.Item
          name="customerId"
          label="Customer"
          rules={[{ required: true }]}
        >
          {loadingCustomers ? (
            <Spin tip="Loading" size="small">
              <div className="content" />
            </Spin>
          ) : (
            <Select
              options={customers?.map((cust) => ({
                value: cust.id,
                label: cust.username,
              }))}
            />
          )}
        </Form.Item>
        <Form.Item
          name="startAt"
          label="Check-In"
          rules={[{ required: true }]}
        >
          <DatePicker
            showTime
            placeholder="Select Check-In"
          />
        </Form.Item>
        <Form.Item
          name="endAt"
          label="Check-Out"
          rules={[{ required: true }]}
        >
          <DatePicker
            showTime
            placeholder="Select Check-Out"
          />
        </Form.Item>
        <Form.Item
          name="adults"
          label="Adults"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Quantity Adult"
            options={adultsArray?.map((person) => ({
              value: person,
              label: person,
            }))}
          />
        </Form.Item>
        <Form.Item
          name="children"
          label="Children"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Quantity Children"
            options={childrenArray?.map((person) => ({
              value: person,
              label: person,
            }))}
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          disabled={isPending}
        >
          Reserve
        </Button>
      </Form>
    </>
  );
};

export default CreateBooking;
