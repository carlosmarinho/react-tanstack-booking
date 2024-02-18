import { IImage } from '../components/location/ILocation';

const BASE_URL = process.env.REACT_APP_BASE_URL;

/**
 * @todo try to implement return of small images from formats
 */
export function getIMageFromData(data: IImage) {
  return `${BASE_URL}${data?.url}`;
}
