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
import dayjs from 'dayjs';
import { IUser } from '../../user/IUser';
import { ILocation } from '../../location/ILocation';
import { ICity } from '../../city/ICity';
import { IRoom } from '../../room/IRoom';
import { adultsArray, childrenArray } from '../../../utils';
import { useReserve } from '../../../hooks/useReserve';
import { validateMaxGuests } from '../helpers';

const CreateBooking = () => {
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const {
    cityId,
    locationId,
    roomId,
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

  const {
    isPending,
    isSuccess,
    warningMessage,
    successMessage,
    setCheckIn,
    setCheckOut,
    night,
    roomSelected,
    setRoomSelected,
    doReservation,
  } = useReserve({
    roomId,
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
    if (locationId && roomId) {
      setRoomSelected(
        locations
          ?.find((location) => location.id === locationId)
          ?.rooms?.data.find((r) => r.id === roomId),
      );
    }
  }, [locationId, roomId]);

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
    }
  }, [isSuccess]);

  const canReserve = () => {
    return (
      night > 0 &&
      parseInt(adults) + parseInt(children) > 0 &&
      // room?.guests &&
      parseInt(adults) + parseInt(children) <= roomId &&
      // room?.guests &&
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
            room: roomId,
            // totalValue: parseInt(room?.rate) * night,
            totalValue: night,
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
            name="roomId"
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
            disabledDate={(d) =>
              !d || d.isBefore(new Date())
            }
            status={
              checkIn?.isBefore(dayjs()) ? 'error' : ''
            }
          />
        </Form.Item>
        <Form.Item
          name="checkOut"
          label="Check-Out"
          rules={[{ required: true }]}
          status={
            checkOut?.isBefore(dayjs()) ||
            checkOut?.isBefore(checkIn) ||
            checkOut?.isSame(checkIn)
              ? 'error'
              : ''
          }
        >
          <DatePicker
            onChange={setCheckOut}
            placeholder="Select Check-Out"
            disabledDate={(d) =>
              !d ||
              d.isBefore(new Date()) ||
              d.isBefore(checkIn?.add(1, 'day'))
            }
            status={
              checkOut?.isBefore(dayjs()) ||
              checkOut?.isBefore(checkIn) ||
              checkOut?.isSame(checkIn)
                ? 'error'
                : ''
            }
          />
        </Form.Item>
        <Form.Item
          name="adults"
          label="Adults"
          rules={[
            { required: true },
            ({ getFieldValue }) => ({
              validator(_, value) {
                return validateMaxGuests({
                  getFieldValue,
                  field: 'children',
                  value,
                  roomSelected,
                });
              },
            }),
          ]}
        >
          <Select
            placeholder="Quantity Adult"
            options={adultsArray?.map((person) => ({
              value: person,
              label: person,
            }))}
            status={
              parseInt(adults) === 0 || parseInt(adults) > 5
                ? 'error'
                : ''
            }
          />
        </Form.Item>
        <Form.Item
          name="children"
          label="Children"
          rules={[
            { required: true },
            ({ getFieldValue }) => ({
              validator(_, value) {
                return validateMaxGuests({
                  getFieldValue,
                  field: 'adults',
                  value,
                  roomSelected,
                });
              },
            }),
          ]}
        >
          <Select
            placeholder="Quantity Children"
            options={childrenArray?.map((person) => ({
              value: person,
              label: person,
            }))}
            status={parseInt(adults) > 5 ? 'error' : ''}
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
