import { StatusType } from '../create/ICreateBooking';

export interface IEditBooking {
  id: number;
  startAt?: Date;
  endAt?: Date;
  users_permissions_user?: number;
  room?: number;
  location?: number;
  nights?: number;
  nightValue?: number;
  totalValue?: number;
  status?: StatusType;
  adults?: number;
  children?: number;
  totalGuests?: number;
}
