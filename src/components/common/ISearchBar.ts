import { Dayjs } from 'dayjs';
export interface ISearchBarValues {
  adult?: number;
  children?: number;
  city: number;
  startAt: Dayjs;
  endAt: Dayjs;
}
