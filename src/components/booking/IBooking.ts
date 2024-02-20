import { IRoom } from '../room/IRoom';
export interface Ibooking {
  id: string;
  location: string;
  customerId: string;
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
