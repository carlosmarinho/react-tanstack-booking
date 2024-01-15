import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, Spin } from 'antd';
import { sendApiRequest } from '../../../helpers/sendApiRequest';
import { ICreateBooking } from './ICreateBooking';
import { useEffect } from 'react';

const CreateBooking = () => {
  const [form] = Form.useForm();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: ICreateBooking) =>
      sendApiRequest(
        'https://65a48cf652f07a8b4a3d73c0.mockapi.io/booking',
        'POST',
        data,
      ),
  });

  console.log(
    '\n\n***\n isSuccesss: ',
    isSuccess,
    '\n***\n',
  );

  useEffect(() => {
    if (isSuccess) {
      console.log(
        '\n\n***\n vai resetar: ',
        isSuccess,
        '\n***\n',
      );
      form.resetFields();
    }
  }, [isSuccess]);

  const onFinish = (values: ICreateBooking) => {
    mutate(values);
    if (isSuccess) {
      form.resetFields();
    }
  };
  return (
    <>
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
