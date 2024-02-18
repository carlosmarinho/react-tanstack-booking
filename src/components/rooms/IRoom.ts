import { ILocation } from '../location/ILocation';

export interface IRoom {
  id: number;
  name: string;
  description: string;
  location: ILocation;
  rate: number;
  guests: number;
}
