import { Dayjs } from 'dayjs';
import { IRoom } from '../room/IRoom';
export interface Ibooking {
  id: string;
  location: string;
  customerId: string;
  startAt: Date;
  endAt: Date;
}

export interface IDoReserve {
  checkIn: Dayjs | null;
  checkOut?: Dayjs | null;
  room?: IRoom;
  night: number;
  totalValue: number;
}
