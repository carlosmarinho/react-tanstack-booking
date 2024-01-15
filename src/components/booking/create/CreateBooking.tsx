import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input } from 'antd';
import { sendApiRequest } from '../../../helpers/sendApiRequest';
import { ICreateBooking } from './ICreateBooking';

const CreateBooking = () => {
  const createBookingMutation = useMutation({
    mutationFn: (data: ICreateBooking) =>
      sendApiRequest(
        'http://localhost:/3001/bookings',
        'POST',
        data,
      ),
  });

  const onFinish = (values: ICreateBooking) => {
    console.log('values: ', values);
    createBookingMutation.mutate(values);
  };
  return (
    <Form name="create-booking" onFinish={onFinish}>
      <Form.Item
        name="location_id"
        label="Location"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="customer_id"
        label="Customer"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="start_at"
        label="Check-In"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="end_at"
        label="Check-Out"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Reserve
      </Button>
    </Form>
  );
};

export default CreateBooking;
