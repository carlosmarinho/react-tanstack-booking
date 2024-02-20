import { useQuery } from '@tanstack/react-query';
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
import { useEffect } from 'react';
import { IUser } from '../../user/IUser';
import { ILocation } from '../../location/ILocation';
import { ICity } from '../../city/ICity';
import { IRoom } from '../../room/IRoom';
import { adultsArray, childrenArray } from '../../../utils';
import { useReserve } from '../../../hooks/useReserve';

const CreateBooking = () => {
  const [form] = Form.useForm();
  const totalValue = 0;

  const values = Form.useWatch([], form);
  const {
    cityId,
    locationId,
    room,
    checkIn,
    checkOut,
    adults,
    children,
    user,
  } = values || {
    cityId: 0,
    locationId: 0,
    roomId: 0,
  };

  console.log(
    '\n\n***\n roooom: ',
    room,
    checkIn,
    checkOut,
    '\n***\n',
  );

  const {
    isPending,
    isSuccess,
    warningMessage,
    successMessage,
    setCheckIn,
    setCheckOut,
    night,
    // checkIn,
    // checkOut,
    doReservation,
  } = useReserve({
    roomId: room,
    strCheckIn: checkIn?.format('YYYY/MM/DD'),
    strCheckOut: checkOut?.format('YYYY/MM/DD'),
  });

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

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
    }
  }, [isSuccess]);

  const canReserve = () => {
    return (
      night > 0 &&
      parseInt(adults) + parseInt(children) > 0 &&
      room?.guests &&
      parseInt(adults) + parseInt(children) <=
        room.guests &&
      totalValue > 0 &&
      !isSuccess
    );
  };

  const [location] = locations || [{ rooms: { data: [] } }];

  return (
    <>
      {warningMessage && (
        <Alert message={warningMessage} type="warning" />
      )}

      {successMessage && (
        <Alert message={successMessage} type="success" />
      )}
      <Form
        name="create-booking"
        onFinish={() =>
          doReservation({
            room,
            totalValue,
            adults: parseInt(adults),
            children: parseInt(children),
            user,
          })
        }
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
          name="user"
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
          name="checkIn"
          label="Check-In"
          rules={[{ required: true }]}
        >
          <DatePicker
            onChange={setCheckIn}
            placeholder="Select Check-In"
          />
        </Form.Item>
        <Form.Item
          name="checkOut"
          label="Check-Out"
          rules={[{ required: true }]}
        >
          <DatePicker
            onChange={setCheckOut}
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
          disabled={!canReserve() || isPending}
        >
          Reserve
        </Button>
      </Form>
    </>
  );
};

export default CreateBooking;
