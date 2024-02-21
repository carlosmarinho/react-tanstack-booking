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
import { useParams } from 'react-router-dom';
import { Ibooking } from '../IBooking';
import dayjs from 'dayjs';

/**
 * @todo use the same form as creating booking
 * @todo create hook to load those data
 */
const UpdateBooking = () => {
  const { bookingId } = useParams();
  const [form] = Form.useForm();

  const values = Form.useWatch([], form);
  const {
    city,
    locationId,
    roomId,
    checkIn,
    checkOut,
    adults,
    children,
  } = values || {
    city: 0,
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
    setNight,
    // checkIn,
    // checkOut,
  } = useReserve({
    roomId,
    strCheckIn: checkIn?.format('YYYY/MM/DD'),
    strCheckOut: checkOut?.format('YYYY/MM/DD'),
  });

  const { isLoading, data: booking } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: async () => {
      return await sendApiRequestforUser<{
        data: Ibooking;
      }>(
        `/bookings/${bookingId}?populate[location][populate][0]=city&populate[room][populate][0]=featuredImage`,
        'GET',
      );
    },
  });

  const initialValues = {
    city: booking?.data.location?.data.city?.data.id,
    locationId: booking?.data.location?.data.id,
    room: booking?.data.room?.data.id,
    user: booking?.data.userId,
    checkIn: dayjs(booking?.data.startAt),
    checkOut: dayjs(booking?.data.endAt),
    adults: booking?.data.adults,
    children: booking?.data.children,
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
      queryKey: ['locations', city],
      queryFn: async () => {
        return await sendApiRequest<ILocation[]>(
          `/locations?populate=featuredImage,rooms&filters[city][id][$eq]=${values.city}`,
          'GET',
        );
      },
      enabled: !!city,
    });

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (initialValues) {
      setCheckIn(initialValues.checkIn);
      setCheckIn(initialValues.checkOut);
    }
    if (booking) {
      setNight(booking?.data.nights);
    }
  }, []);

  const canReserve = () => {
    return (
      night > 0 &&
      parseInt(adults) + parseInt(children) > 0 &&
      // parseInt(adults) + parseInt(children) <= room &&
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

      {isLoading ? (
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      ) : (
        <Form
          name="create-booking"
          initialValues={initialValues}
          // @todo Implement onFinish
          // onFinish={() =>
          //   doReservation({
          //     room: roomId,
          //     totalValue: location
          //       parseInt(
          //         location.rooms?find(
          //           (room) => room.data.id === roomId,
          //         )?.rate,
          //       ) * night,
          //     adults: parseInt(adults),
          //     children: parseInt(children),
          //     user,
          //   })
          // }
          form={form}
        >
          <Form.Item
            name="city"
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
          {city && (
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
          {city && locationId && locations && (
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
            Update Booking
          </Button>
        </Form>
      )}
    </>
  );
};

export default UpdateBooking;
