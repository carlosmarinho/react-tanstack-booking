import { ILocation } from '../location/ILocation';

export interface IRoom {
  id: number;
  name: string;
  locations: ILocation[];
}
