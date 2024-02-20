import { useContext, useState } from 'react';
import AuthContext from '../context/auth';
import { useMutation } from '@tanstack/react-query';
import { ICreateBooking } from '../components/booking/create/ICreateBooking';
import { sendApiRequest } from '../helpers/sendApiRequest';
import { IDoReserve } from '../components/booking/IBooking';

export function useReserve(roomId: string | undefined) {
  const [warningMessage, setWarningMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { isLogged, authTokens } = useContext(AuthContext);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ['doReservation', roomId],
    mutationFn: (data: ICreateBooking) =>
      sendApiRequest('/bookings', 'POST', data),
  });

  const doReservation = ({
    checkIn,
    checkOut,
    room,
    night,
    totalValue,
  }: IDoReserve) => {
    if (!checkIn || !checkOut) {
      setWarningMessage(
        'You need to select your Check In and Check Out!',
      );
    } else {
      if (!isLogged) {
        setWarningMessage(
          'Please Login to our website on top right of page to do your reservation!',
        );
      } else {
        if (checkIn && checkOut && room) {
          const reservetionData = {
            startAt: checkIn.toDate(),
            endAt: checkOut.toDate(),
            user: authTokens.id,
            room: room.id,
            nights: night,
            nightValue: room?.rate,
            totalValue: totalValue,
          };
          mutate(reservetionData);
          if (isSuccess) {
            setSuccessMessage(
              'Your reservation was successfull concluded! Please wait confirmation!',
            );
          }
        }
      }
    }
  };

  return {
    mutate,
    isPending,
    isSuccess,
    warningMessage,
    successMessage,
    doReservation,
  };
}
