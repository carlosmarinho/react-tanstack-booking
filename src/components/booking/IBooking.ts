import { ILocation } from '../location/ILocation';
import { IRoom } from '../room/IRoom';
import { IUser } from '../user/IUser';

/**
 * @todo we don't need userId cause we already have relation user_permission_user in strapi, but getting error to fetch
 * booking relation to it
 */
export interface Ibooking {
  id: string;
  location: { data: ILocation };
  room: { data: IRoom };
  user_permission_user: { data: IUser };
  userId: number;
  nights: number;
  totalValue: number;
  status: string;
  totalGuests: number;
  startAt: Date;
  endAt: Date;
  adults?: number;
  children?: number;
}

export interface IDoReserve {
  room?: IRoom;
  totalValue: number;
  adults: number;
  children?: number;
  user?: number;
}
