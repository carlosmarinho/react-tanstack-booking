import { ICity } from '../city/ICity';
import { IRoom } from '../rooms/IRoom';

export interface IImage {
  ext: '.jpg';
  formats?: { small: IImage; thumbnail: IImage };
  hash: string;
  height: number;
  id: number;
  mime: string;
  name: string;
  previewUrl: string | null;
  provider: string;
  size: number;
  updatedAt: Date;
  url: string;
  width: number;
}

export interface ILocation {
  id: number;
  name: string;
  description: string;
  type: string;
  city?: { data: ICity };
  featuredImage: { data: IImage };
  galleryImages?: { data: IImage[] };
  rooms?: { data: IRoom[] };
  rating: number;
  website: string;
  createdAt: Date;
  updatedAt: Date;
}
