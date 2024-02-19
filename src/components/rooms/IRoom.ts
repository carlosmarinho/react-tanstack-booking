import { IImage, ILocation } from '../location/ILocation';

export interface IRoom {
  id: number;
  featureImage: { data: IImage };
  name: string;
  description: string;
  location: ILocation;
  rate: number;
  guests: number;
}
