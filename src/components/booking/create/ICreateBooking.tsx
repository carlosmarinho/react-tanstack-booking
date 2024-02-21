export enum StatusType {
  pending = 'Pending',
  confirmed = 'confirmed',
  paid = 'Paid',
  canceled = 'Canceled',
  deleted = 'Deleted',
}

export interface ICreateBooking {
  startAt: Date;
  endAt: Date;
  users_permissions_user: number;
  room: number;
  location?: number;
  nights: number;
  nightValue: number;
  totalValue: number;
  status?: StatusType;
  adults: number;
  children: number;
  totalGuests: number;
}
