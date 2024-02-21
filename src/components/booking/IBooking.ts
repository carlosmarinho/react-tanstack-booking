import { ILocation } from '../location/ILocation';
import { IRoom } from '../room/IRoom';
import { IUser } from '../user/IUser';
export interface Ibooking {
  id: string;
  location: { data: ILocation };
  room: { data: IRoom };
  user_permission_user: { data: IUser };
  nights: number;
  totalValue: number;
  status: string;
  totalGuests: number;
  startAt: Date;
  endAt: Date;
}

export interface IDoReserve {
  room?: IRoom;
  totalValue: number;
  adults: number;
  children?: number;
  user?: number;
}
