enum StatusType {
  initial = 'Initial',
  confirmed = 'Confirmed',
  paid = 'Paid',
  canceled = 'Canceled',
  deleted = 'Deleted',
}

export interface ICreateBooking {
  startAt: Date;
  endAt: Date;
  user: number;
  room: number;
  location?: number;
  nights: number;
  nightValue: number;
  totalValue: number;
  status?: StatusType;
}
