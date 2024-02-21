import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/auth';
import { useMutation } from '@tanstack/react-query';
import { ICreateBooking } from '../components/booking/create/ICreateBooking';
import { sendApiRequest } from '../helpers/sendApiRequest';
import { IDoReserve } from '../components/booking/IBooking';
import dayjs, { Dayjs } from 'dayjs';

interface IUseReserve {
  roomId: string | undefined;
  strCheckIn: string | undefined;
  strCheckOut: string | undefined;
}

export function useReserve({
  roomId,
  strCheckIn,
  strCheckOut,
}: IUseReserve) {
  const [warningMessage, setWarningMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { isLogged, authTokens } = useContext(AuthContext);
  const [night, setNight] = useState(0);
  const [checkIn, setCheckIn] = useState<Dayjs | null>(
    strCheckIn ? dayjs(strCheckIn) : null,
  );

  const [checkOut, setCheckOut] = useState<Dayjs | null>(
    strCheckOut ? dayjs(strCheckOut) : null,
  );

  useEffect(() => {
    if (checkIn && checkOut) {
      const hours = checkOut.diff(checkIn, 'hours');
      const days = Math.floor(hours / 24);
      setNight(days);
    }
  }, [checkIn, checkOut]);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ['doReservation', roomId],
    mutationFn: (data: ICreateBooking) =>
      sendApiRequest('/bookings', 'POST', data),
  });

  useEffect(() => {
    if (isSuccess) {
      setSuccessMessage(
        'Your reservation was successfull concluded! Please wait confirmation!',
      );
    }

    const successTimeout = setTimeout(
      () => setSuccessMessage(''),
      5000,
    );

    return () => {
      clearTimeout(successTimeout);
    };
  }, [isSuccess]);

  const doReservation = ({
    room,
    totalValue,
    adults,
    children = 0,
    user,
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
            users_permissions_user: user || authTokens.id,
            userId: user || authTokens.id,
            room: room.id,
            location: room.location?.data.id,
            nights: night,
            nightValue: room?.rate,
            totalValue: totalValue,
            adults,
            children,
            totalGuests: adults + children,
          };
          mutate(reservetionData);
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
    setCheckIn,
    setCheckOut,
    checkIn,
    checkOut,
    night,
    setNight,
    doReservation,
  };
}
